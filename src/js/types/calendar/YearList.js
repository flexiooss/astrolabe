import {assert, assertType, isNull, isNumber} from '@flexio-oss/assert'
import {FlexMap} from '@flexio-oss/flex-types'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
 * @extends {FlexMap<Year>}
 */
export class YearList extends FlexMap {
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof globalFlexioImport.io.flexio.astrolabe.types.Year, 'element should be a Year')
    }
  }

  toObject() {
    const obj = {}
    this.forEach((value, key) => { obj[key] = value.toObject() })
    return obj
  }
}

export class YearListBuilder {
  constructor() {
    this._values = []
  }

  /**
   * @param {YearList} yearList
   * @returns {YearListBuilder}
   */
  values(yearList) {
    this._values = Array.from(yearList)
    return this
  }

  /**
   * @param {number} key
   * @param { Year } year
   * @returns {YearListBuilder}
   */
  pushValue(key, year) {
    assertType(isNumber(key), 'YearListBuilder:pushValue: key should be a number')
    assertType(year instanceof globalFlexioImport.io.flexio.astrolabe.types.Year, 'YearListBuilder:pushValue: layer should be an instance of Year')
    this._values.push([key, year])
    return this
  }

  /**
   * @returns {YearList}
   */
  build() {
    let res = new YearList()
    this._values.forEach(([key, value]) => {
      res.set(key, value)
    })
    return res
  }

  /**
   * @param {object} jsonObject
   * @returns {YearListBuilder}
   */
  static fromObject(jsonObject) {
    const builder = new YearListBuilder()
    Object.keys(jsonObject).forEach(key => {
      builder.pushValue(Number.parseInt(key), globalFlexioImport.io.flexio.astrolabe.types.YearBuilder.fromObject(jsonObject[key]).build())
    })
    return builder
  }

  /**
   * @param {string} json
   * @returns {YearListBuilder}
   */
  static fromJson(json) {
    const jsonObject = JSON.parse(json)
    return this.fromObject(jsonObject)
  }

  /**
   * @param {YearList} instance
   * @returns {YearListBuilder}
   */
  static from(instance) {
    const builder = new YearListBuilder()
    Array.from(instance).forEach(([key, value]) => {
      builder.pushValue(key, globalFlexioImport.io.flexio.astrolabe.types.YearBuilder.from(value).build())
    })
    return builder
  }
}
