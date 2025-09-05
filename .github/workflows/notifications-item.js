// utils
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Avatar from '@mui/material/Avatar';
import classNames from 'classnames';

// components
import { RideRequestCreated } from './notifications-item-ride-request-created';
import { RideRequestUpdated } from './notifications-item-ride-request-updated';

export const NotificationsItem = ({ notification, markAsSeen }) => {
  const onMouseOverAction = () => {
    if (!notification.seen_at) markAsSeen(notification.id);
  };

  const renderNotification = (notification) => {
    switch (notification.notification_type) {
      case 'ride_request_created':
        return <RideRequestCreated notification={notification} />;
      case 'ride_request_accepted':
      case 'ride_request_rejected':
        return <RideRequestUpdated notification={notification} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames('notification', { 'notification--seen': notification.seen_at })}
      onMouseOver={onMouseOverAction}
    >
      <Link to={`/users/${notification.sender.id}`}>
        <Avatar src={notification.sender.avatar} />
      </Link>
      {renderNotification(notification)}
    </div>
  );
};

NotificationsItem.propTypes = {
  notification: PropTypes.object.isRequired,
  markAsSeen: PropTypes.func.isRequired,
};
