"use client"

import Header from '../components/Header';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import InterestedVehicle from '../recommendations/InterestedVehicle';  // Import the InterestedVehicle component

const Recommendations = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="h-[90vh] bg-white px-12 py-10">
        <Tabs aria-label="Options" size="lg">
          <Tab title="Interest Based Recommendations">
            <Card>
              <CardBody>
                <InterestedVehicle />  {/* Use the InterestedVehicle component */}
              </CardBody>
            </Card>
          </Tab>
          <Tab title="Behavoiur Based Recommendations">
            <Card>
              <CardBody>
                {/* Component that show recommendations based on user history */}
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