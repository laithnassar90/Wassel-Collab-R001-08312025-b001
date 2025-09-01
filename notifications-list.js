import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { NotificationsItem } from '../notifications-item/notifications-item';

export const NotificationsList = ({ notifications, markAsSeen }) => {
  const renderNotificationsItems = () => {
    if (notifications.pagination.total_count > 0) {
      return notifications.items.map((notification, i) => (
        <NotificationsItem
          key={i}
          notification={notification}
          markAsSeen={markAsSeen}
        />
      ));
    } else {
      return <div className="header__notifications__empty">No new notifications</div>;
    }
  };

  const renderNotificationsFooter = () => {
    if (notifications.pagination.total_count > 0) {
      return (
        <Link to="/notifications">
          <div className="header__notifications__footer">See all</div>
        </Link>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="header__notifications__header">Notifications</div>
      {renderNotificationsItems()}
      {renderNotificationsFooter()}
    </div>
  );
};

NotificationsList.propTypes = {
  notifications: PropTypes.object.isRequired,
  markAsSeen: PropTypes.func.isRequired,
};
