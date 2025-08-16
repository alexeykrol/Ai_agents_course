import { Button } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';

const Buttons = () => {
  return (
    <div>
      <CardBox>
        <h5 className="card-title">Buttons</h5>
        <div className="flex gap-4 flex-wrap mt-2">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="info">Info</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Danger</Button>
          <Button color="light">Light</Button>
          <Button color="dark">Dark</Button>
        </div>
      </CardBox>
      <CardBox className="mt-6">
        <h5 className="card-title">Outline Buttons</h5>
        <div className="flex gap-4 flex-wrap mt-2">
          <Button
            color="primary"
            className="border border-primary text-primary hover:bg-primary hover:text-white"
            pill
            outline
          >
            Primary
          </Button>
          <Button
            color="secondary"
            className="border border-secondary text-secondary hover:bg-secondary hover:text-white"
            pill
            outline
          >
            Secondary
          </Button>
          <Button
            color="success"
            className="border border-success text-success hover:bg-success hover:text-white"
            pill
            outline
          >
            Success
          </Button>
          <Button
            color="info"
            className="border border-info text-info hover:bg-info hover:text-white"
            pill
            outline
          >
            Info
          </Button>
          <Button
            color="warning"
            className="border border-warning text-warning hover:bg-warning hover:text-white"
            pill
            outline
          >
            Warning
          </Button>
          <Button
            color="error"
            className="border border-error text-error hover:bg-error hover:text-white"
            pill
            outline
          >
            Danger
          </Button>
          <Button color="light" className="border border-dark/50 text-dark/50 hover:bg-dark/50 hover:text-white " pill outline>
            Light
          </Button>
          <Button
            color="dark"
            className="border border-dark text-dark hover:bg-dark hover:text-white "
            pill
            outline
          >
            Dark
          </Button>
        </div>
      </CardBox>
    </div>
  );
};

export default Buttons;
