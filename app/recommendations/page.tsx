"use client"

import Header from '../components/Header';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import InterestedVehicle from './InterestedVehicle';  
import BehaviouralVehicle from './BehaviouralVehicle';  
import TrendingVehicles from './Trending&PopularVehicles';

const Recommendations = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="h-[90vh] bg-white px-12 py-10">
        <Tabs aria-label="Options" size="lg">
          <Tab title="Interest Based Recommendations">
            <Card>
              <CardBody>
                <InterestedVehicle />  
              </CardBody>
            </Card>
          </Tab>
          <Tab title="Trending Vehicle Recommendations ">
            <Card>
              <CardBody>
                <TrendingVehicles />
              </CardBody>
            </Card>
          </Tab>
          <Tab title="Behaviour Based Recommendations">
            <Card>
              <CardBody>
                <BehaviouralVehicle />  
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;





          
          // <Tab title="Most Popular Recommended Cars">
          //   <Card>
          //     <CardBody>
          //       {/* Component that show recommendations Generally most popular vehicles */}
          //     </CardBody>
          //   </Card>
          // </Tab>