// utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// actions
import { fetchUsers } from '../../../actions/users';

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { UsersIndexItem } from '../../../components/users/users-index-item/users-index-item'

const per = 10

class UsersIndex extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers(1, per)
  }

  handlePageClick(e) {
    const { fetchUsers } = this.props
    const page = e.selected + 1
    fetchUsers(page, per)
  }

  renderUsersMain() {
    const { isStarted, isFetching } = this.props

    return (
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>Users</div>
        </div>
        <AsyncContent isFetching={isFetching || !isStarted}>
          {this.renderUsersList()}
        </AsyncContent>
      </Col>
    )
  }

  renderUsersList() {
    const { users } = this.props

    return (
      <List>
        {users.map((user, i) => (
          <ListItem key={i}>
            <UsersIndexItem user={user} />
          </ListItem>
        ))}
      </List>
    )
  }

  renderRidesPagination() {
    const { pagination } = this.props

    if (pagination.total_pages > 1) {
      return (
        <div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            pageCount={pagination.total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick.bind(this)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <>
        {this.renderUsersMain()}
        {this.renderRidesPagination()}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users.items,
  isStarted: state.users.isStarted,
  isFetching: state.users.isFetching,
  pagination: state.users.pagination,
})

const mapDispatchToProps = { fetchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex)
