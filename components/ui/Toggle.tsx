import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ToggleProps {
  chatOnlyView: boolean;
  setChatOnlyView: (value: boolean) => void;
}

export default function Toggle({ chatOnlyView, setChatOnlyView }: ToggleProps) {
  return (
    <div className="sm:hidden flex w-full items-center justify-center mt-5 mb-1">
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          as="span"
          className="mr-3 text-sm flex items-center gap-2"
        >
          <span
            className={`font-medium ${
              chatOnlyView ? 'text-gray-400' : 'text-gray-900 font-semibold'
            }`}
          >
            PDF + Chat
          </span>
        </Switch.Label>
        <Switch
          checked={chatOnlyView}
          onChange={setChatOnlyView}
          className={classNames(
            chatOnlyView ? 'bg-black' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              chatOnlyView ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-in-out',
            )}
          />
        </Switch>
        <Switch.Label
          as="span"
          className="ml-3 text-sm flex items-center gap-2"
        >
          <span
            className={`font-medium ${
              !chatOnlyView ? 'text-gray-400' : 'text-gray-900 font-semibold'
            }`}
          >
            Chat Only
          </span>
        </Switch.Label>
      </Switch.Group>
    </div>
  );
}