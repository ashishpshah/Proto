import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'master',
        short_label: 'MS',
        name: 'Master',
        type: 'sub',
        icon: 'ti-crown',
        children: [

          // {
          //   state: 'city-master',
          //   name: 'City  Master'
          // },
          {
            state: 'root-header-master',
            name: 'Root Header Master'
          },
          {
            state: 'root-category-master',
            name: 'Root Category Master'
          },
          {
            state: 'department-master',
            name: 'Department Master'
          },
          {
            state: 'category-master',
            name: 'Category Master'
          },
          {
            state: 'sub-category-master',
            name: 'Sub Category Master'
          },
          {
            state: 'item-master',
            name: 'Item Master'
          },
          {
            state: 'country-master',
            name: 'Country Master'
          },
          {
            state: 'state-master',
            name: 'State Master'
          },
          {
            state: 'street-master',
            name: 'Street Master'
          }
          ,{
            state: 'route-master',
            name: 'Route Master'
          }
          ,{
            state: 'driver-master',
            name: 'Driver Master'
          }
          ,{
            state: 'vehicle-master',
            name: 'Vehicle Master'
          }
          ,{
            state: 'vehicle-route-master',
            name: 'Vehicle Route Mapping'
          }
          ,{
            state: 'route-time-mgmt',
            name: 'Route Time Management'
          }
          ,{
            state: 'vehicle-route-time-detail',
            name: 'Vehicle Route Time Detail'
          }
          ,{
            state: 'vehicle-route-time-map',
            name: 'Vehicle Route Schedule'
          }
          ,{
            state: 'brand-master',
            name: 'Brand Master'
          }
          ,{
            state: 'type-master',
            name: 'Type Master'
          }
          ,{
            state: 'pincode-master',
            name: 'Allowed Pincode Master'
          }
          ,{
            state: 'home-slider',
            name: 'Slider Master'
          }

        ]
      },

      // {
      //   state: 'basic',
      //   short_label: 'B',
      //   name: 'Basic Components',
      //   type: 'sub',
      //   icon: 'ti-layout-grid2-alt',
      //   children: [
      //     {
      //       state: 'button',
      //       name: 'Button'
      //     },
      //     {
      //       state: 'typography',
      //       name: 'Typography'
      //     }
      //   ]
      // },
      // {
      //   state: 'notifications',
      //   short_label: 'n',
      //   name: 'Notifications',
      //   type: 'link',
      //   icon: 'ti-crown'
      // },
    ],
  },
  // {
  //   label: 'Tables',
  //   main: [
  //     {
  //       state: 'bootstrap-table',
  //       short_label: 'B',
  //       name: 'Bootstrap Table',
  //       type: 'link',
  //       icon: 'ti-receipt'
  //     }
  //   ]
  // },
  // {
  //   label: 'Map And Extra Pages ',
  //   main: [
  //     {
  //       state: 'map',
  //       short_label: 'M',
  //       name: 'Maps',
  //       type: 'link',
  //       icon: 'ti-map-alt'
  //     },
  //     {
  //       state: 'authentication',
  //       short_label: 'A',
  //       name: 'Authentication',
  //       type: 'sub',
  //       icon: 'ti-id-badge',
  //       children: [
  //         {
  //           state: 'login',
  //           type: 'link',
  //           name: 'Login',
  //           target: true
  //         }, {
  //           state: 'registration',
  //           type: 'link',
  //           name: 'Registration',
  //           target: true
  //         }
  //       ]
  //     },
  //     {
  //       state: 'user',
  //       short_label: 'U',
  //       name: 'User Profile',
  //       type: 'link',
  //       icon: 'ti-user'
  //     }
  //   ]
  // },
  // {
  //   label: 'Other',
  //   main: [
  //     {
  //       state: '',
  //       short_label: 'M',
  //       name: 'Menu Levels',
  //       type: 'sub',
  //       icon: 'ti-direction-alt',
  //       children: [
  //         {
  //           state: '',
  //           name: 'Menu Level 2.1',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.2',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.2',
  //               target: true
  //             }
  //           ]
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.3',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.4',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.2',
  //               target: true
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       state: 'simple-page',
  //       short_label: 'S',
  //       name: 'Simple Page',
  //       type: 'link',
  //       icon: 'ti-layout-sidebar-left'
  //     }
  //   ]
  // }, {
  //   label: 'Support',
  //   main: [
  //     {
  //       state: 'Upgrade To Pro',
  //       short_label: 'U',
  //       external: 'https://codedthemes.com/item/guru-able-admin-template/',
  //       name: 'Upgrade To Pro',
  //       type: 'external',
  //       icon: 'ti-layout-list-post',
  //       target: true
  //     }
  //   ]
  // }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
