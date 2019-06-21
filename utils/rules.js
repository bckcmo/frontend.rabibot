export default {
  required: (value, field) => !!value || `${field} field is required`,
  format: (value, field, regex) => regex.test(value) || `${field} must be valid`,
  match: (value, field1, field2, match) => value && match === value || `${field1} and ${field2} must match`,
  number: value => (!Number.isNaN(Number(value))) || 'This field must be a number',
  max: (value, field, limit) => value.length <= limit || `${field} must be less than ${limit} characters`,
  equal: (value, field, limit) => value.length === limit || `${field} must be ${limit} characters`,
  range: (value, field, low, high) => value >= low
    && value <= high
    || `${field} must be between ${low} and ${high}`,
}
