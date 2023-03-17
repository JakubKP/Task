import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'

const DishForm = () => {

  const [responseStatus, setResponseStatus] = useState("")

  const onSubmit = (values, form) => {
    fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if(response.ok) {
        form.reset()
        setResponseStatus('Success')
      } else {
        setResponseStatus('Something went wrong')
      }
      response.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })

  }

  const formatPreparationTime = (value) => {

    if (!value) {
      return null
    }
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 2) {
      return onlyNums
    }
    if (onlyNums.length <= 4) {
      return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2)}`
    }
    return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 4)}:${onlyNums.slice(4, 6)}`
  }

  return (
    <Form onSubmit={onSubmit} initialValues={{ preparation_time: '00:00:00' }}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} className='Form'>
          <div>
            <label htmlFor="name">Dish Name</label>
            <Field name="name" component="input" type="text" placeholder="Dish Name" required />
          </div>

          <div>
            <label htmlFor="preparation_time">Preparation Time</label>
            <Field name="preparation_time" component="input" type="text" placeholder="00:00:00" required format={formatPreparationTime} maxLength="8" />
          </div>

          <div>
            <label htmlFor="type">Dish Type</label>
            <Field name="type" component="select" placeholder="Select a dish type" required>
              <option value="">Select a dish type</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </Field>
          </div>

          {values.type === 'pizza' ? (
            <>
              <div>
                <label htmlFor="no_of_slices">No. of Slices</label>
                <Field name="no_of_slices" component="input" type="number" placeholder="No. of Slices" required />
              </div>

              <div>
                <label htmlFor="diameter">Diameter</label>
                <Field name="diameter" component="input" type="number" placeholder="Diameter" step="0.01" required />
              </div>
            </>
          ) : null}

          {values.type === 'soup' ? (
            <div>
              <label htmlFor="spiciness_scale">Spiciness Scale</label>
              <Field name="spiciness_scale" component="input" type="number" placeholder="Spiciness Scale" min="1" max="10" required />
            </div>
          ) : null}

          {values.type === 'sandwich' ? (
            <div>
              <label htmlFor="slices_of_bread">Slices of Bread</label>
              <Field name="slices_of_bread" component="input" type="number" placeholder="Slices of Bread" required />
            </div>
          ) : null}

          <button type="submit">Submit</button>
          {responseStatus !== "" ? (
            <div>{responseStatus}</div>
            ) : null}
        </form>
      )}
    </Form>
  )
}

export default DishForm
