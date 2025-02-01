import { Button } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'

const FormFooter = (props) => {
  const formikContext = useFormikContext();

  const handleReset = () => {
    props.handleReset(formikContext);
  }

  return (
    <div className='flex gap-2'>
      <Button type='primary' onClick={formikContext.handleSubmit} className='font-semibold' >
        Submit
      </Button>
      <Button type='primary' danger onClick={handleReset} className='font-semibold' >
        Reset
      </Button>
    </div>
  )
}

export default FormFooter