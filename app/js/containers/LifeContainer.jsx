import { connect } from 'react-redux'
import Life from '../components/Life'

const mapStateToProps = state => ({
  weeks: state.weeks
})

export default connect(mapStateToProps)(Life)
