import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    let pageNumbers = []
    // console.log(totalPosts,postsPerPage)
    // console.log(Math.ceil(totalPosts / postsPerPage))
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav >
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)}  className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;