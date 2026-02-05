DHTMLX Gantt
============

Version 9.1.1, Professional Edition


License
------------

Evaluation License, check license.txt for more details

How to install using npm/yarn
------------

Professional Evaluation version:

- npm config set @dhx:registry=https://npm.dhtmlx.com
- npm install @dhx/trial-gantt

Professional version:

Generate your login and password for private npm in your Client's Area: https://dhtmlx.com/clients/

- npm config set @dhx:registry=https://npm.dhtmlx.com
- npm login --registry=https://npm.dhtmlx.com --scope=@dhx --auth-type=legacy
- npm install @dhx/gantt

How to start
------------

- check our how-to-start tutorials https://docs.dhtmlx.com/gantt/desktop__howtostart_guides.html
- explore code samples https://docs.dhtmlx.com/gantt/samples/


How to run samples
------------

All the samples except for a few that explicitly require a REST backend api can be opened as static files.

Running the backend:

- `npm install` or `yarn install`
- `npm start` or `yarn start`
- go to `http://localhost:9200`

or

- copy `codebase` and `samples` folders of the package to your Apache/nginx directory and open samples as static html pages. Demos that require RESTful backend will not work in that case.

React Version
------------

The React version of the library is available as a separate package. It is a wrapper around the core library and provides React components for Gantt.

It is available under the Commercial, Enterprice, Ultimate and Evaluation licenses.

You can find the samples project for the React Gantt in `react-samples` folder of the package.

How to install the React Version using npm/yarn
-------------

Professional Evaluation version:

- npm config set @dhx:registry=https://npm.dhtmlx.com
- npm install @dhx/trial-react-gantt

Professional version:

Generate your login and password for private npm in your Client's Area: https://dhtmlx.com/clients/


Package structure
------------

- ./codebase - css and javascript files of the library
- ./samples - code samples
- ./backend - a simple node backend to run samples

Useful links
-------------

- Product information
	https://dhtmlx.com/docs/products/dhtmlxGantt/

- Online documentation
	https://docs.dhtmlx.com/gantt/

- Support forum
	https://forum.dhtmlx.com/c/gantt