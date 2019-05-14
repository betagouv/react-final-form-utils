import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(name) {
  return name
}

export const selectEntitiesOptionsFromNameAndEntities = createCachedSelector(
  (name, entities) => entities,
  (name, entities, placeholder, labelKey) => labelKey || 'label',
  (name, entities, placeholder, labelKey, valueKey) => valueKey || 'id',
  (entities, labelKey, labelValue) => {
    const entitiesOptions = entities.map(o => ({
      label: o && o[labelKey],
      value: o && o[labelValue],
    }))

    return entitiesOptions
  }
)(mapArgsToCacheKey)

export default selectEntitiesOptionsFromNameAndEntities
