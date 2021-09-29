import React, { useContext, useState } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { ImagesLightBox } from './ImagesLightBox';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import { ThemeContext } from '../context/theme';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({
  post: { title, description, images, tags, createdBy, createdAt, id, username, imgUserProfile, likeCount, commentCount, likes }
}) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const { themeColor } = useContext(ThemeContext);
  const [selectedImageIndex, setSelectedImageIndex] = useState(false);

  const handleToggleImage = (index) => {
    setToggle(true);
    setSelectedImageIndex(index)
  }
  const handleCloseModal = () => {
    setToggle(false);
  }
  return (
    <div className={`post-item-container ${themeColor} container-fluid`}>
      <div>
        <div className="post-item-top">
          {imgUserProfile ?
            <img src={imgUserProfile} alt="user-profile" className="profile-avatar" onClick={() => history.push(`user/${createdBy}`)}/>
            : <img className="no-avatar" />
          }
          <div className="post-item-top-info">
            <div className="user-name">{username}</div>
            <Card.Meta as={Link} to={`/posts/${id}`}>
              {moment(createdAt).fromNow(true)} ago
            </Card.Meta>
          </div>
          <div className="trash-container">{user && user.username === username && <DeleteButton postId={id} />}</div>
        </div>
        <div className="post-item-body">
          <h3>{title}</h3>
          <div>{description}</div>
          <div className="image-container">
            {
              images.map((image, index) =>
                <div className="layout-item" onClick={() => handleToggleImage(index)}>
                  <img src={image} alt="img-post" className="layout-image"/>
                </div>
              )
            }
          </div>
          {
            toggle && <ImagesLightBox
              images={images}
              selectedImageIndex={selectedImageIndex}
              handleCloseModal={handleCloseModal}
              animationStyles="in-animation"
            />
          }
        </div>
      </div>
      <div className="post-item-bottom">
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
      </div>
    </div>
  );
}

export default PostCard;
