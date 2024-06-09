import { useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const CustomTabView = () => {
  const [tabValue, setTabValue] = useState('all_books');

  const isActive = (tab: 'all_books' | 'reading_list') => tab === tabValue;

  const activeTabStyles = {
    background: 'slateblue',
    color: 'white',
    borderRadius: '1rem',
  };

  return (
    <Tabs
      sx={{ bgcolor: '#ededed', borderRadius: '1rem' }}
      onChange={(_, value) => setTabValue(value)}
    >
      <Tab
        value="all_books"
        label="All books"
        sx={isActive('all_books') ? activeTabStyles : {}}
      />
      <Tab
        value="reading_list"
        label="Reading List"
        sx={isActive('reading_list') ? activeTabStyles : {}}
      />
    </Tabs>
  );
};

export default CustomTabView;
