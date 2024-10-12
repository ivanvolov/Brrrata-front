import { useState } from 'react';

import Mint from '../actions/Mint';
import Burn from '../actions/Burn';
import Stake from '../actions/Stake';
import Buckets from '../interfaces/Buckets';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('stake');

  const renderContent = () => {
    switch (activeTab) {
      case 'mint':
        return (
          <div className="p-6">
            <Mint />
          </div>
        );
      case 'burn':
        return (
          <div className="p-6">
            <Burn />
          </div>
        );
      case 'stake':
        return (
          <div className="p-6">
            <Stake />
          </div>
        );
      case 'unstake':
        return (
          <div className="overflow-y-auto p-6">
            <Buckets />
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      {/* Tabs Section */}
      <div className="border-b border-gray-200">
        <ul className="flex justify-between items-center -mb-px text-sm font-medium text-center text-gray-500">
          <NavItem
            isActive={activeTab === 'mint'}
            iconType="mint"
            onClick={() => setActiveTab('mint')}
          />
          <NavItem
            isActive={activeTab === 'burn'}
            iconType="burn"
            onClick={() => setActiveTab('burn')}
          />
          <NavItem
            isActive={activeTab === 'stake'}
            iconType="stake"
            onClick={() => setActiveTab('stake')}
          />
          <NavItem
            isActive={activeTab === 'unstake'}
            iconType="unstake"
            onClick={() => setActiveTab('unstake')}
          />
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="text-medium text-gray-500 w-full">{renderContent()}</div>
    </>
  );
}

const NavItem = ({ isActive, iconType, onClick }: any) => {
  const iconPaths: any = {
    mint: 'M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z',
    burn: 'M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z',
    stake:
      'M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z',
    unstake:
      'M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z',
  };

  const viewBoxSize: any = {
    mint: '0 0 20 20',
    burn: '0 0 18 18',
    stake: '0 0 20 20',
    unstake: '0 0 18 20',
  };

  return (
    <li className="group flex-1 flex justify-center">
      <a
        href="#"
        className={`group p-4 inline-flex items-center justify-center ${isActive ? 'border-b-2 border-blue-600' : ''}`}
        onClick={onClick}
      >
        <svg
          className={`w-5 h-5 group-hover:text-gray-500 ${isActive ? 'text-gray-500' : 'text-gray-400'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox={viewBoxSize[iconType]}
        >
          <path d={iconPaths[iconType]} />
        </svg>
      </a>
    </li>
  );
};
