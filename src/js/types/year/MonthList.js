import {assert, isNull} from '@flexio-oss/assert'
import {FlexMap} from '@flexio-oss/flex-types'
import {Month} from '../Month'

/**
 * @extends {FlexMap<?Month>}
 */
class MonthList extends FlexMap {
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof Month, 'element should be a Month')
    }
  }
}

export {MonthList}
