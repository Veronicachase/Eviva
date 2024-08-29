import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';


function Content({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isSubscribed = useSelector((state) => state.user.isSubscribed);

  if (!isLoggedIn) {
    return (
      <div>
        <p>Login to access this content.</p>
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div>
        <p>Content available under subscription.</p>
      </div>
    );
  }

  return <>{children}</>;  
}

Content.propTypes={
children : PropTypes.node
}

export default Content;
