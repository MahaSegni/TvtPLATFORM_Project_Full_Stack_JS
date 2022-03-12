import React from 'react'
import classnames from 'classnames'

function InputGroup({label, name, onChangeHandler, errors,value}) {
  return (
    <div className="mb-3">
    <label for="Email" className="form-label">
      {label}
    </label>
    <input className={(classnames("form-control", {"is-invalid": errors}))}  name={name} value={value}onChange={onChangeHandler}/>
    {
      errors && (<div class="invalid-feedback">
      {errors}
    </div>)
    }
  </div>
  )
}

export default InputGroup