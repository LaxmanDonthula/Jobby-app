import './index.css'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,

    location,
    rating,
    title,
    jobDescription,
  } = jobDetails

  return (
    <li className="similar-product-item">
      <div className="logo-name-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <div className="description-link">
        <h1 className="description">Description</h1>
      </div>
      <p className="job-description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobItem
