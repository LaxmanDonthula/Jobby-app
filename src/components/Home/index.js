import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />

    <div className="home-page-container">
      <h1 className="heading-homepage">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="body-homepage">
        Millions of people are searching for jobs, salary
        <br />
        information, company reviews. Find the job that fits your <br />
        abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="find-jobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
