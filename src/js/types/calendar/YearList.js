import {assert, isNull} from '@flexio-oss/assert'
import {FlexMap} from '@flexio-oss/flex-types'
import {Year} from '../Year'

/**
 * @extends {FlexMap<Year>}
 */
class YearList extends FlexMap {
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof Year, 'element should be a Month')
    }
  }
}

export {YearList}
