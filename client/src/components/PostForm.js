import React, { useState, useEffect } from 'react';
import { Button, Form, TextArea, Icon } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#384ec1'
  },
}));

function PostForm() {
  const classes = useStyles();
  const [inputImgList, setInputImgList] = useState([""]);
  const tags = ["sport", "education", "economic"];
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: '',
    description: '',
    images: [""],
    tags
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: { ...values, images: inputImgList },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.title = '';
      values.description = '';
      values.images = [""];
      values.tags = [];
    }
  });
  const [tag, setTags] = useState([]);

  function createPostCallback() {
    createPost();
  }
  const handleAddImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInputImgList([...inputImgList, ""]);
  }
  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const list = [...inputImgList];
    list.splice(index, 1);
    setInputImgList(list);
  }
  const handleInputImgChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputImgList];
    list[index] = value;
    setInputImgList(list);
  }
  return (
    <>
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>What's on your mind ? </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <Form.Input
                  placeholder="Title"
                  name="title"
                  onChange={onChange}
                  value={values.title}
                  error={error ? true : false}
                />
                <TextArea
                  placeholder="Description"
                  name="description"
                  onChange={onChange}
                  value={values.body}
                  error={error ? true : false}
                />
                <div className="mt-primary">
                  {
                    inputImgList.map((item, index) =>
                      <div className="img-url-item" key={index}>
                        <Form.Input
                          placeholder="Image URL"
                          name="imageUrl"
                          onChange={e => handleInputImgChange(e, index)}
                          value={item}
                          error={error ? true : false}
                        />
                        <Button icon onClick={e => handleRemoveImage(e, index)}>
                          <Icon name='x' />
                        </Button>
                      </div>)
                  }
                </div>
                <div className="mt-vertical-primary">
                  <Button icon labelPosition='left' onClick={handleAddImage} color="orange">
                    <Icon name='add square' />
                    Add Image
                   </Button>
                </div>
                <div>
                  <Button type="submit" color="teal">
                    Submit
                </Button>
                </div>
              </Form.Field>
            </Form>
            {error && (
              <div className="ui error message" style={{ marginBottom: 20 }}>
                <ul className="list">
                  <li>{error.graphQLErrors[0].message}</li>
                </ul>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $description: String, $images: [String], $tags: [String]) {
    createPost(title: $title, description: $description, images: $images, tags: $tags) {
      id
      title,
      description
      images
      tags
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        imgUserProfile
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
