import {assert, isNull} from '@flexio-oss/assert'
import {FlexMap} from '@flexio-oss/flex-types'
import {Week} from '../Week'

/**
 * @extends {FlexMap<Week>}
 */
class WeekList extends FlexMap {
  _validate(element) {
    if (!isNull(element)) {
      assert(element instanceof Week, 'element should be a Week')
    }
  }
}

export {WeekList}
