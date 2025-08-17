import { Alert } from 'flowbite-react';

const BasicAlerts = () => {
  return (
    <>
      <div className="rounded-xl shadow-md bg-white p-6 relative w-full break-words">
        <h5 className="card-title mb-4">Alert</h5>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="flex flex-col gap-2">
              <Alert color="primary" className="rounded-lg">
                <span className="font-medium">Primary</span> - A simple primary alert
              </Alert>

              <Alert color="secondary" className="rounded-lg">
                <span className="font-medium">Secondary</span> A simple Secondary alert
              </Alert>

              <Alert color="success" className="rounded-lg">
                <span className="font-medium">Success</span> A simple Success alert
              </Alert>

              <Alert color="info" className="rounded-lg">
                <span className="font-medium">Info</span> A simple Info alert
              </Alert>

              <Alert color="warning" className="rounded-lg">
                <span className="font-medium">Warning</span> A simple Warning alert
              </Alert>

              <Alert color="error" className="rounded-lg">
                <span className="font-medium">Error</span> A simple Error alert
              </Alert>

              <Alert color="dark" className="rounded-lg">
                <span className="font-medium">Dark</span> A simple Dark alert
              </Alert>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="flex flex-col gap-2">
              <Alert  className="rounded-lg bg-primary/10 text-primary">
                <span className="font-medium">Primary</span> - A simple primary alert
              </Alert>

              <Alert  className="rounded-lg bg-secondary/10 text-secondary">
                <span className="font-medium">Secondary</span> A simple Secondary alert
              </Alert>

              <Alert  className="rounded-lg bg-success/10 text-success">
                <span className="font-medium">Success</span> A simple Success alert
              </Alert>

              <Alert  className="rounded-lg bg-info/10 text-info">
                <span className="font-medium">Info</span> A simple Info alert
              </Alert>

              <Alert className="rounded-lg bg-warning/10 text-warning">
                <span className="font-medium">Warning</span> A simple Warning alert
              </Alert>

              <Alert className="rounded-lg bg-error/10 text-error">
                <span className="font-medium">Error</span> A simple Error alert
              </Alert>

              <Alert className="rounded-lg bg-dark/20 text-dark">
                <span className="font-medium">Light</span> A simple Light alert
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicAlerts;
