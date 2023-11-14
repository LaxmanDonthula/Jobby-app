import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobSpecificData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getLifeAtCompanyDetails = data => ({
    imageUrl: data.image_url,
    description: data.description,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props

    const {params} = match

    const apiUrl = `https://apis.ccbp.in/jobs/${params.id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      console.log(fetchedData)
      const jobSpecificConvertedData = this.getFormattedData(
        fetchedData.job_details,
      )

      const lifeAtCompany = this.getLifeAtCompanyDetails(
        fetchedData.job_details.life_at_company,
      )

      const skills = fetchedData.job_details.skills.map(data => ({
        name: data.name,
        imageUrl: data.image_url,
      }))

      const similarJobs = fetchedData.similar_jobs.map(data => ({
        companyLogoUrl: data.company_logo_url,
        employmentType: data.employment_type,
        id: data.id,
        location: data.location,
        rating: data.rating,
        title: data.title,
        jobDescription: data.job_description,
      }))

      const mainJobData = {
        ...jobSpecificConvertedData,
        lifeAtCompany,
        skills,
      }

      console.log(mainJobData)

      this.setState({
        similarJobsData: similarJobs,
        apiStatus: apiStatusConstants.success,
        jobSpecificData: mainJobData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  displayJobsSpecificData = () => {
    const {jobSpecificData, similarJobsData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobSpecificData

    return (
      <>
        <div className="job-item-card">
          <div className="logo-name-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="company-title-info">
              <h1 className="company-title">{title}</h1>
              <div className="logo-name-container">
                <AiFillStar className="star-logo" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-emptype-package-container">
            <div className="location-emptype">
              <div className="logo-name-container">
                <MdLocationOn className="location-logo" />
                <p className="location">{location}</p>
              </div>
              <div className="logo-name-container">
                <BsFillBriefcaseFill className="empType-logo" />
                <p className="empType">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-container">
            <div className="description-link">
              <h1 className="description">Description</h1>

              <button type="button" className="visit-btn">
                <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                  Visit <FiExternalLink />
                </a>
              </button>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <h1 className="description">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="skill-list-item">
                <img src={eachSkill.imageUrl} alt={eachSkill.name} />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <h1 className="description">Life at Company</h1>
            <div className="life-at-company-description-pic">
              <p>{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                className="life-at-company-pic"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar-jobs">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(eachJob => (
              <SimilarJobItem jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getJobDetails} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderJobData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.displayJobsSpecificData()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="job-details-page">{this.renderJobData()}</div>
      </>
    )
  }
}

export default JobItemDetails
