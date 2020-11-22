
## Emirate Auction Test

First, install the dependencies for this application by simply running: 

```bash 
yarn
```

Then, run the development server:

```bash
yarn dev
```

Note this will be done from your terminal.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Libraries Used

Libraries used for this test includes the following and why:

- NextJs: This is a javascript library built on top of Reactjs, I used this because of the benefits that comes with it such as SEO friendly, support clients and server side rendering of data.
- Chakra UI: This is UI library for Reactjs, I used this to save an extra development time while writing css styles.

## Problems Solved

The following problems where solved in this task with the following approach:

- ### Using React hooks instead of Classes: 
Functions are stateless and don't require render function to display UI, and no need to "bind method" amd "this". 
Also it's easier to decouple logic from UI, making both more reusable.

- ### Internationalization: 
This simply mean to display the web content in the visitors local or preferred language.
This problem was solved by using NextJs which supports internalization and emotion's cacheProvider and stylis.
First i had to setup the config in file named ``next.config.js`` to defined the supported languages we want for the webapp.
In Nextjs, after the config, it will handle the route pathName with the language string example: ```/ar/home``` and i will get access to the locale which is inside the router.
Hence, i had to create base component for the rtl provider function, which will wrap the entire application. This rtl provider will be responsible for the switching of web-page in rtl.
``` typescript
const router = useRouter();
    const {  children } = props;
    const direction: LangDirectionType = router.locale == 'ar' ? 'rtl' : 'ltr';
```
Therefore when the locale change, we change the application direction.

- ### Pagination: 
In this case, the data returning in the API is not paginated, hence i had to resort to front-end pagination.
To achieve this front-end pagination, i had to create a function to chunk this data into sizes i want to render on the screen.
```typescript
const chunk = (array, chunkSize) => {
const output = [];
    let arrayIndex = 0;
    while (arrayIndex < array.length) {
        output.push(array.slice(arrayIndex, arrayIndex += chunkSize));
    }
    return output;
}
```
Now I have access to a paginated data, i created a functional component called PaginationComponent, which takes ```pagination, currentPage```  props.
Inside this component, i destruct page size and the current page from the route, which i passed with the currentPage to a helper function called paginateFn.
The PaginateFn handles the calculation of number of pages, and the range with truncation. in this case we will have ```1 2 3 4 5 ... 30```.

### Alternatively 
I would have used infinite scroll or load more by simply listening for when page height then load more data when we get to the bottom threshHold,
 the hooks will look like this eg: 
 ```typescript
import {useState} from 'react';
import axios from 'axios';

const usePagaination =  () => {
   const [currentItems, setCurrentItems] = useState();

   const loadData = async (size) => {
    const { data } = await axios.get("https://api.eas.ae/v2/carsonline");
    const limit = data.Cars.length;
    if(size < limit){
      setCurrentItems(data.Cars.slice(0, size));
      return
    }
    setCurrentItems(data.Cars)
   };
  
   return { currentItems, loadData}
}
```
after a thorough research on listing web applications, i decided to go with number pagination.

- ### Update list with updated data: 
This problem was solved via the following:
  - I had to convert the refreshInterval "60" data to milliseconds by multiplying by 1000.
  - I created a hook to handle updated data fetching while passing the last ```ticks``` as a query to the api end-point.
  - I created a useInterval hooks which i passed ```onRefresh function```  and ```auto delay``` variable which is in 60secs. Hence every 6osec, the hooks is triggered with the latest ticks as query to the api and we get the updated data.
  - Once the we get the updated data, i chunk the data to be paginated then i passed it down to ```car-auction-component``` as props. Inside this component i further passed it down as a props to the ```card component``` keeping track of the currentIndex eg: ```updatedData[index]```.
  - In the card component using lodash._isEqual, i deep compared the updated data. This will return true if both data are the same but false if there are changes. Then i created a local state to handle flash and set to false, then created an effect, ```useEffect``` which will trigger when their is changes 
  and inside the effect, i check if false, set the flash data to true and after ```1000ms``` set back to false. This will trigger the grey flash if data is updated.
  
  ### Alternatively 
  - I will use Redux to handle the states, dispatch the updated data to redux. But this will be an overkill for the test demo.  
 
