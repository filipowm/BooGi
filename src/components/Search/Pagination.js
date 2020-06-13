import React from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Button = styled(({ refine, page, children, ...props }) => {
  const changePage = (event) => {
    event.preventDefault();
    refine(page);
  };
  return (
    <button href="#" onClick={changePage} {...props}>
      {children}
    </button>
  );
})`
  width: 32px;
  height: 32px;
  visibility: ${(props) => props.visible || props.visible === undefined ? 'visible' : 'hidden' };
  vertical-align: middle;
  transition: ${(props) => props.theme.transitions.hover};
  background-color: ${(props) =>
    props.isCurrent
      ? props.theme.search.pagination.current.background
      : props.theme.search.pagination.background};
  border: 1px solid ${(props) => props.theme.search.pagination.border};

  color: ${(props) =>
    props.isCurrent
      ? props.theme.search.pagination.current.font
      : props.theme.search.pagination.font};
  border-radius: 4px;
  box-shadow: 0 0 4px 0 ${(props) => props.theme.colors.border};
  font-size: 1em;
  cursor: inherit;
  &:hover {
    background-color: ${(props) => props.theme.search.pagination.hover};
    color: ${(props) => props.theme.search.pagination.fontHover};
  }
  svg {
    stroke: ${(props) => props.theme.search.pagination.font};
    vertical-align: middle;
  }
`;

const PagesList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0 auto;
  align-items: center;
  li {
    margin: 0 1px;
    cursor: pointer;
  }
`;

const PagesListWrapper = styled.div`
  padding-top: 14px;
  padding-bottom: 2px;
  border-top: 1px solid ${(props) => props.theme.search.pagination.border};
  width: 100%;
  display: flex;
`;

const leftRightMargin = '12px';

const Pagination = ({ totalPages, nbPages, currentPage, refine, showPrevious, showNext }) => {
  const pagesToShow = totalPages && nbPages > totalPages ? totalPages : nbPages;
  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage === pagesToShow ? currentPage : currentPage + 1;
  return (
    <PagesListWrapper>
      <PagesList>
        {showPrevious ? (
          <li style={{ marginRight: leftRightMargin }}>
            <Button visible={currentPage > 1} refine={refine} page={previousPage}>
              <ChevronLeft />
            </Button>
          </li>
        ) : null}
        {new Array(pagesToShow).fill(null).map((_, index) => {
          const page = index + 1;
          const isCurrent = currentPage === page;

          return (
            <li key={index}>
              <Button refine={refine} page={page} isCurrent={isCurrent}>
                {page}
              </Button>
            </li>
          );
        })}
        {showNext ? (
          <li style={{ marginLeft: leftRightMargin }}>
            <Button visible={currentPage !== pagesToShow} refine={refine} page={nextPage}>
              <ChevronRight />
            </Button>
          </li>
        ) : (
          ''
        )}
      </PagesList>
    </PagesListWrapper>
  );
};

export default Pagination;
