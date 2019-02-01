import React from "react";
import styled from "styled-components";
import ReactTags from "react-tag-autocomplete";
import { Query } from "react-apollo";

import { TAGS, CREATE_TAG } from "../../queries";
import "./style.css";

class TagPicker extends React.Component {
  state = {
    searchValue: ""
  };

  handleInputChange = async searchValue => {
    const currentSearchValue = searchValue.trim().toLowerCase();
    this.setState({
      searchValue: currentSearchValue
    });
  };

  handleClickToAddTag = async client => {
    const name = this.state.searchValue;
    this.setState({ searchValue: "" });
    await client.mutate({
      mutation: CREATE_TAG,
      variables: { name },
      optimisticResponse: {
        __typename: "Mutation",
        createTag: {
          __typename: "Tag",
          id: `${Date.now()}-${name}`,
          name
        }
      },
      update: (cache, { data: { createTag } }) => {
        this.props.handleAddTag(createTag);
        const { tags } = cache.readQuery({
          query: TAGS,
          variables: {
            first: 6,
            where: { name_starts_with: name }
          }
        });
        cache.writeQuery({
          query: TAGS,
          data: {
            tags: [...tags, createTag]
          }
        });
      }
    });
  };

  render() {
    const { searchValue } = this.state;
    const { handleDeleteTag, handleAddTag, tags } = this.props;
    return (
      <Query
        query={TAGS}
        variables={{
          first: 6,
          where: { name_starts_with: searchValue }
        }}
        skip={!searchValue || searchValue.length < 1}
        errorPolicy="ignore"
      >
        {({ data, loading, client }) => {
          let suggestions = [];
          if (data && data.tags) {
            suggestions = data.tags;
          }
          return (
            <>
              <ReactTags
                tags={tags}
                suggestions={suggestions}
                handleDelete={handleDeleteTag}
                handleAddition={handleAddTag}
                handleInputChange={value => this.handleInputChange(value)}
                placeholder="Add tags"
                minQueryLength={1}
                delimiters={[]}
              />
              {loading && (
                <ReactTagsStyle>
                  <div className="react-tags">
                    <span className="loader">🔄</span>
                  </div>
                </ReactTagsStyle>
              )}
              {!loading && !suggestions.length && searchValue.length > 2 && (
                <ReactTagsStyle>
                  <div className="react-tags">
                    <div className="react-tags__suggestions">
                      <ul>
                        <li onClick={() => this.handleClickToAddTag(client)}>
                          🆕{searchValue}
                        </li>
                      </ul>
                    </div>
                  </div>
                </ReactTagsStyle>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default TagPicker;

const ReactTagsStyle = styled.div`
  > .react-tags {
    background-color: transparent;
    padding: 0;
    margin: 0;
    border: none;
  }
`;
