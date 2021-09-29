import Select from "react-select"

const defaultValue = (selectOptions, value) => {
  return selectOptions ? selectOptions.find((option) => option.value === value) : ""
}

const CustomSelectField = ({ onChange, value, options, ...rest }) => {
  return (
    <div>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
        {...rest}
      />
    </div>
  )
}

export default CustomSelectField
