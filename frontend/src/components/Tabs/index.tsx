import { useContext, useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { AppContext } from '../../context';

const CustomTabView = () => {
  const [tabValue, setTabValue] = useState('all_books');

  const { toggleReadingList } = useContext(AppContext);
  type TabName = 'all_books' | 'reading_list';

  const isActive = (tab: TabName) => tab === tabValue;

  const activeTabStyles = {
    background: '#4AA088',
    color: 'white',
    borderRadius: '1rem',
  };

  const handleTabChange = (value: TabName) => {
    setTabValue(value);
  };

  useEffect(() => {
    toggleReadingList(isActive('reading_list'));
  }, [tabValue]);

  return (
    <Tabs
      sx={{ bgcolor: '#ededed', borderRadius: '1rem' }}
      onChange={(_, value) => handleTabChange(value)}
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
