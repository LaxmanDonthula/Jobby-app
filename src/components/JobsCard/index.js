import './index.css'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const jobsCard = props => {
  const {jobsData} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = jobsData

  return (
    <li className="job-item-card">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="logo-name-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="description">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default jobsCard
