import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assert, assertType, isNull, isNumber} from '@flexio-oss/assert'
import {FlexMap} from '@flexio-oss/flex-types'

/**
 * @extends {FlexMap<Week>}
 */
export class WeekList extends FlexMap {
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof globalFlexioImport.io.flexio.astrolabe.types.Week, 'element should be a Week')
    }
  }

  toObject() {
    const obj = {}
    this.forEach((value, key) => { obj[key] = value.toObject() })
    return obj
  }
}

export class WeekListBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param {WeekList} weekList
   * @returns {WeekListBuilder}
   */
  values(weekList) {
    this._values = Array.from(weekList)
    return this
  }

  /**
   * @param {number} key
   * @param { Week } week
   * @returns {WeekListBuilder}
   */
  pushValue(key, week) {
    assertType(isNumber(key), 'WeekListBuilder:pushValue: key should be a number')
    assertType(week instanceof globalFlexioImport.io.flexio.astrolabe.types.Week, 'WeekListBuilder:pushValue: week should be an instance of Week')
    this._values.push([key, week])
    return this
  }

  /**
   * @returns {WeekList}
   */
  build() {
    let res = new WeekList()
    this._values.forEach(([key, value]) => {
      res.set(key, value)
    })
    return res
  }

  /**
   * @param {object} jsonObject
   * @returns {WeekListBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new WeekListBuilder()
    Object.keys(jsonObject).forEach(key => {
      builder.pushValue(Number.parseInt(key), globalFlexioImport.io.flexio.astrolabe.types.WeekBuilder.fromObject(jsonObject[key]).build())
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {WeekListBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {WeekList} instance
   * @returns {WeekListBuilder}
   */
  static from(instance) {
    const builder = new WeekListBuilder()
    Array.from(instance).forEach(([key, value]) => {
      builder.pushValue(key, globalFlexioImport.io.flexio.astrolabe.types.WeekBuilder.from(value).build())
    })
    return builder
  }
}
