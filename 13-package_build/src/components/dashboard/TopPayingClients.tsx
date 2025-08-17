import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
} from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';

import user1 from '/src/assets/images/profile/user-2.jpg';
import user2 from '/src/assets/images/profile/user-3.jpg';
import user3 from '/src/assets/images/profile/user-4.jpg';
import user4 from '/src/assets/images/profile/user-5.jpg';
import user5 from '/src/assets/images/profile/user-1.jpg';

const TopPayingClients = () => {
  const TopEmployeesData = [
    {
      id: '1',
      imgsrc: user1,
      name: 'Mark J. Freeman',
      post: 'Developer',
      status: 'Available',
      rate: 80,
      skill: 'HTML',
      statuscolor: 'success',
    },
    {
      id: '2',
      imgsrc: user2,
      name: 'Nina R. Oldman',
      post: 'Designer',
      status: 'On Holiday',
      rate: 70,
      skill: 'JavaScript',
      statuscolor: 'primary',
    },
    {
      id: '3',
      imgsrc: user3,
      name: 'Arya H. Shah',
      post: 'Developer',
      status: 'Absent',
      rate: 40,
      skill: 'React',
      statuscolor: 'error',
    },
    {
      id: '4',
      imgsrc: user4,
      name: 'June R. Smith',
      post: 'Designer',
      status: 'On Leave',
      rate: 20,
      skill: 'Vuejs',
      statuscolor: 'warning',
    },
    {
      id: '5',
      imgsrc: user5,
      name: 'Deo K. Luis',
      post: 'Developer',
      status: 'Available',
      rate: 65,
      skill: 'Angular',
      statuscolor: 'info',
    },
  ];

  return (
    <>
      <CardBox>
        <div className="flex justify-between align-baseline">
          <h5 className="card-title">Top Paying Clients</h5>
        </div>

        <div className="overflow-x-auto overflow-y-hidden">
          <Table className="">
            <TableHead className="border-0">
              <TableHeadCell className="text-15 font-semibold  py-3 whitespace-nowrap">
                Profile
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold  py-3 whitespace-nowrap">
                Hour Rate
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold py-3 whitespace-nowrap">
                Technology
              </TableHeadCell>
              <TableHeadCell className="text-15 font-semibold py-3 whitespace-nowrap">
                Status
              </TableHeadCell>
            </TableHead>
            <TableBody className="">
              {TopEmployeesData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex gap-4 items-center">
                      <img src={item.imgsrc} alt="icon" className="h-12 w-12 rounded-full" />
                      <div className="w-full md:pe-0 pe-10">
                        <h6 className="text-15">{item.name}</h6>
                        <p className="text-13 font-medium">{item.post}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap ">
                    <p className="text-sm text-ld  font-medium">${item.rate}/hour</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p className="text-ld text-sm  font-medium">{item.skill}</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap ">
                    <Badge
                      color={`light${item.statuscolor}`}
                      className={`border font-medium border-${item.statuscolor} `}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBox>
    </>
  );
};

export default TopPayingClients;
