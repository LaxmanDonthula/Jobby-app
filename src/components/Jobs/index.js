import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import JobsCard from '../JobsCard'

import FiltersGroup from '../FiltersGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const loadingState = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsLoadingState: loadingState.initial,
    profileLoadingState: loadingState.initial,
    jobsList: [],
    profileData: [],
    activeEmpTypes: [],
    activeSalaryId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.renderJobs()
    this.getProfile()
  }

  removeFilters = () => {
    this.setState(
      {searchInput: '', activeEmpTypes: [], activeSalaryId: ''},
      this.renderJobs,
    )
  }

  getProfile = async () => {
    this.setState({profileLoadingState: loadingState.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const ProfileResponse = await fetch(profileApiUrl, options)

    if (ProfileResponse.ok === true) {
      const fetchedProfileData = await ProfileResponse.json()

      const profile = {
        name: fetchedProfileData.profile_details.name,
        profileImageUrl: fetchedProfileData.profile_details.profile_image_url,
        shortBio: fetchedProfileData.profile_details.short_bio,
      }

      this.setState({
        profileData: profile,
        profileLoadingState: loadingState.success,
      })
    } else {
      this.setState({profileLoadingState: loadingState.failure})
    }
  }

  renderJobs = async () => {
    this.setState({jobsLoadingState: loadingState.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {activeEmpTypes, activeSalaryId, searchInput} = this.state

    let empTypes = ''

    if (activeEmpTypes.length >= 1) {
      empTypes = activeEmpTypes.join().toUpperCase()
    }

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypes}&minimum_package=${activeSalaryId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsApiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const modifiedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsLoadingState: loadingState.success,
        jobsList: modifiedData,
      })
    } else {
      this.setState({jobsLoadingState: loadingState.failure})
    }
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state

    const {shortBio, name, profileImageUrl} = profileData

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-loading-container">
      <button type="button" className="retry-btn" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderProfileLoadingView = () => (
    <div className="profile-loading-container">{this.renderLoadingView()}</div>
  )

  renderProfile = () => {
    const {profileLoadingState} = this.state

    switch (profileLoadingState) {
      case loadingState.success:
        return this.renderProfileSuccessView()
      case loadingState.inProgress:
        return this.renderProfileLoadingView()
      case loadingState.failure:
        return this.renderProfileFailureView()

      default:
        return null
    }
  }

  changeEmpType = activeEmpId => {
    const {activeEmpTypes} = this.state

    let newList = []

    if (activeEmpTypes.includes(activeEmpId) === true) {
      newList = activeEmpTypes.filter(eachType => eachType !== activeEmpId)
    } else {
      newList = [...activeEmpTypes, activeEmpId]
    }

    this.setState({activeEmpTypes: newList}, this.renderJobs)
  }

  changeSalaryId = activeSalId => {
    this.setState({activeSalaryId: activeSalId}, this.renderJobs)
  }

  renderFilters = () => {
    const {activeEmpTypes, activeSalaryId} = this.state

    return (
      <>
        <FiltersGroup
          employmentTypesList={employmentTypesList}
          changeEmpType={this.changeEmpType}
          activeEmpTypes={activeEmpTypes}
          salaryRangesList={salaryRangesList}
          activeSalaryId={activeSalaryId}
          changeSalaryId={this.changeSalaryId}
          removeFilters={this.removeFilters}
        />
      </>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchText = () => {
    this.renderJobs()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-icon-btn"
          onClick={this.searchText}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.renderJobs} className="retry-btn">
        Retry
      </button>
    </div>
  )

  getJobsList = () => {
    const {jobsList, jobsLoadingState} = this.state

    if (jobsList.length === 0 && jobsLoadingState === loadingState.success) {
      return (
        <div className="jobs-failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobsList.map(jobs => (
          <JobsCard jobsData={jobs} key={jobs.id} />
        ))}
      </ul>
    )
  }

  renderJobsSection = () => {
    const {jobsLoadingState} = this.state

    switch (jobsLoadingState) {
      case loadingState.success:
        return this.getJobsList()
      case loadingState.inProgress:
        return this.renderLoadingView()
      case loadingState.failure:
        return this.renderJobsFailureView()

      default:
        return null
    }
  }

  render() {
    const {activeEmpTypes} = this.state

    console.log(activeEmpTypes)

    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="profile-filters-container">
            {this.renderProfile()}
            {this.renderFilters()}
          </div>

          <div className="jobs-section">
            {this.renderSearchInput()}
            {this.renderJobsSection()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
