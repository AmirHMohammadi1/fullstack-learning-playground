// ? just for example

import { useLocation, useNavigate, useParams } from 'react-router';

const withRouter = Component => props => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Component
      {...props}
      location={location}
      navigate={navigate}
      params={params}
    />
  );
};

export default withRouter;