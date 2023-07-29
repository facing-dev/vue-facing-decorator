require('jsdom-global/keys.js').push('SVGElement')
require('jsdom-global')()
import './internal/utils'
import './component'
import './option/setup'
import './option/data'
import './option/methods'
import './option/computed'
import './option/emit'
import './option/ref'
import './option/props'
import './option/watch'
import './option/inject'
import './option/vmodel'
import './option/accessor'
import './feature/hooks'
import './feature/classExtends'
import './feature/componentExtends'
import './feature/extends'
import './feature/mixinsFunction'

import './tsx/attributeTypes'
import './custom/custom'

