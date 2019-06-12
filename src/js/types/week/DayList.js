import {assert, isNull} from '@flexio-oss/assert'
import {FlexMap} from '@flexio-oss/flex-types'
import {DateExtended} from '@flexio-oss/extended-flex-types'
/**
* @extends {FlexArray<DateExtended>}
*/
class DayList extends FlexMap {
  /**
    * @param {number} index
    * @returns {DateExtended}
    */
  get(index) {
    return this[index]
  }
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof DateExtended, 'element should be a DateExtended')
    }
  }
}
export { DayList }
