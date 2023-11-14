import './index.css'

const FiltersGroup = props => {
  const {removeFilters} = props

  const onRemoveFilters = () => {
    removeFilters()
  }

  const renderEmpTypesFiltersList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(type => {
      const {changeEmpType, activeEmpTypes} = props
      const onClickItem = () => changeEmpType(type.employmentTypeId)

      const isChecked = activeEmpTypes.includes(type.employmentTypeId)

      return (
        <li className="rating-item" key={type.employmentTypeId}>
          <input
            type="checkbox"
            id={type.employmentTypeId}
            checked={isChecked}
            onChange={onClickItem}
          />
          <label htmlFor={type.employmentTypeId}>{type.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachSalary => {
      const {changeSalaryId, activeSalaryId} = props
      const onClickItem = () => changeSalaryId(eachSalary.salaryRangeId)

      const isChecked = activeSalaryId === eachSalary.salaryRangeId

      return (
        <li className="salary-item" key={eachSalary.salaryRangeId}>
          <input
            type="radio"
            name="salary"
            id={eachSalary.salaryRangeId}
            checked={isChecked}
            onChange={onClickItem}
          />
          <label htmlFor={eachSalary.salaryRangeId}>{eachSalary.label}</label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <hr />
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="empType-container">{renderEmpTypesFiltersList()}</ul>
      <hr />
    </>
  )

  const renderSalaryRangeTypes = () => (
    <>
      <h1 className="category-heading">Salary Range</h1>
      <ul className="empType-container">{renderSalaryRangeList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentTypes()}
      {renderSalaryRangeTypes()}
      <button
        type="button"
        onClick={onRemoveFilters}
        className="clear-fliters-btn"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
