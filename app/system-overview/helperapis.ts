export const fetchUserOverview = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8000/user-overview', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user overview');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Could not load user overview.');
    }
  };
  
export const fetchUserOverviewDetail = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8000/user-data-summary', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data summary');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Could not load user data summary.');
    }
};
  