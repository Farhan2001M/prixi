export const fetchUserOverview = async (token: string) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
      const response = await fetch(`${BASE_URL}/user-overview`, {
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
      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
      const response = await fetch(`${BASE_URL}/user-data-summary`, {
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
  