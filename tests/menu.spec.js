import { test, expect } from '@playwright/test';
import { log, time } from 'console';
test.describe('Menu Bar', () => {
  test.skip('Desktops', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });

    test('Hover', async ({ page }) => {
      const desktops = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/a');
      const pc = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/div/div/ul/li[1]/a');
      const mac = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/div/div/ul/li[2]/a');
      await expect (pc).not.toBeVisible();
      await expect (mac).not.toBeVisible();
      await desktops.hover();
      await expect (pc).toBeVisible();
      await expect (mac).toBeVisible();
    });


    test('PC : click', async ({ page }) => {
      const desktops = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/a');
      await desktops.click();
      const pc = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/div/div/ul/li[1]/a');
      await expect (pc).toBeVisible();
      await pc.click();
      const pcTitle = page.locator('//*[@id="content"]/h2');
      await expect (pcTitle).toBeVisible();
      await expect (pcTitle).toHaveText('PC');
    });


    test('MAC : click', async ({ page }) => {
      const desktops = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/a');
      await desktops.click();
      const mac = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/div/div/ul/li[2]/a');
      await expect (mac).toBeVisible();
      await mac.click();
      const macTitle = page.locator('//*[@id="content"]/h2');
      await expect (macTitle).toBeVisible();
      await expect (macTitle).toHaveText('Mac');
    });


    test('PC : amount of products', async ({ page }) => {
      const desktops = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/a');
      await desktops.click();
      const pc = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/div/div/ul/li[1]/a');
      const amountInMenu = Number((await pc.innerText()).match(/\d+/)[0]);
      await expect (pc).toBeVisible();
      await pc.click();
      const pcTitle = page.locator('//*[@id="content"]/h2');
      await expect (pcTitle).toBeVisible();
      await expect (pcTitle).toHaveText('PC');
      let products = null;
      try {
      products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
      products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('MAC : amount of products', async ({ page }) => {
      const desktops = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/a');
      await desktops.click();
      const mac = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/div/div/ul/li[2]/a');
      await expect (mac).toBeVisible();
      const amountInMenu = Number((await mac.innerText()).match(/\d+/)[0]);
      await mac.click();
      const macTitle = page.locator('//*[@id="content"]/h2');
      await expect (macTitle).toBeVisible();
      await expect (macTitle).toHaveText('Mac');
      let products = null;
      try {
      products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
      products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('Show all products', async ({ page }) => {
      const desktops = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/a');
      await desktops.click();
      const showAll = page.locator('//*[@id="menu"]/div[2]/ul/li[1]/div/a');
      await expect (showAll).toBeVisible();
      await showAll.click();
      const allDesktopsTitle = page.locator('//*[@id="content"]/h2');
      await expect (allDesktopsTitle).toBeVisible();
      await expect (allDesktopsTitle).toHaveText('Desktops');
    });
  });


  test.skip('Laptops & Notebooks', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });


    test('Hover', async ({ page }) => {
      const laptops = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/a');
      const mac = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/div/div/ul/li[1]/a');
      const windows = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/div/div/ul/li[2]/a');
      await expect (mac).not.toBeVisible();
      await expect (windows).not.toBeVisible();
      await expect (laptops).toBeVisible();
      await laptops.hover();
      await expect (mac).toBeVisible();
      await expect (windows).toBeVisible();
    });


    test('MAC : click', async ({ page }) => {
      const laptops = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/a');
      await laptops.click();
      const mac = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/div/div/ul/li[1]/a');
      await expect (mac).toBeVisible();
      await mac.click();
      const macTitle = page.locator('//*[@id="content"]/h2');
      await expect (macTitle).toBeVisible();
      await expect (macTitle).toHaveText('Macs');
    });

    
    test('Windows : click', async ({ page }) => {
      const laptops = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/a');
      await laptops.click();
      const windows = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/div/div/ul/li[2]/a');
      await expect (windows).toBeVisible();
      await windows.click();
      const windowsTitle = page.locator('//*[@id="content"]/h2');
      await expect (windowsTitle).toBeVisible();
      await expect (windowsTitle).toHaveText('Windows');
    });


    test('MAC : amount of products', async ({ page }) => {
      const laptops = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/a');
      await laptops.click();
      const mac = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/div/div/ul/li[1]/a');
      const amountInMenu = Number((await mac.innerText()).match(/\d+/)[0]);
      await expect (mac).toBeVisible();
      await mac.click();
      const macTitle = page.locator('//*[@id="content"]/h2');
      await expect (macTitle).toBeVisible();
      await expect (macTitle).toHaveText('Macs');
      let products = null;
      try {
        products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
        products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('Windows : amount of products', async ({ page }) => {
      const laptops = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/a');
      await laptops.click();
      const windows = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/div/div/ul/li[2]/a');
      const amountInMenu = Number((await windows.innerText()).match(/\d+/)[0]);
      await expect (windows).toBeVisible();
      await windows.click();
      const windowsTitle = page.locator('//*[@id="content"]/h2');
      await expect (windowsTitle).toBeVisible();
      await expect (windowsTitle).toHaveText('Windows');
      let products = null;
      try {
        products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
        products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('Show all products', async ({ page }) => {
      const laptops = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/a');
      await laptops.click();
      const showAll = page.locator('//*[@id="menu"]/div[2]/ul/li[2]/div/a');
      await expect (showAll).toBeVisible();
      await showAll.click();
      const allLaptopsTitle = page.locator('//*[@id="content"]/h2');
      await expect (allLaptopsTitle).toBeVisible();
      await expect (allLaptopsTitle).toHaveText('Laptops & Notebooks');
    });
  });


  test.skip('Components', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });

    
    test('Hover', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      const monitors = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[1]/a');
      const mice = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[2]/a');
      const keyboards = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[3]/a');
      await expect (monitors).not.toBeVisible();
      await expect (mice).not.toBeVisible();
      await expect (keyboards).not.toBeVisible();
      await components.hover();
      await expect (monitors).toBeVisible();
      await expect (mice).toBeVisible();
      await expect (keyboards).toBeVisible();
    });


    test('Mice : click', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const mice = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[1]/a');
      await expect (mice).toBeVisible();
      await mice.click();
      const miceTitle = page.locator('//*[@id="content"]/h2');
      await expect (miceTitle).toBeVisible();
      await expect (miceTitle).toHaveText('Mice and Trackballs');
    });


    test('Monitors : click', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const monitors = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[2]/a');
      await expect (monitors).toBeVisible();
      await monitors.click();
      const monitorsTitle = page.locator('//*[@id="content"]/h2');
      await expect (monitorsTitle).toBeVisible();
      await expect (monitorsTitle).toHaveText('Monitors');
    });


    test('Printers : click', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const printers = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[3]/a');
      await expect (printers).toBeVisible();
      await printers.click();
      const printersTitle = page.locator('//*[@id="content"]/h2');
      await expect (printersTitle).toBeVisible();
      await expect (printersTitle).toHaveText('Printers');
    });


    test('Scanners : click', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const scanners = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[4]/a');
      await expect (scanners).toBeVisible();
      await scanners.click();
      const scannersTitle = page.locator('//*[@id="content"]/h2');
      await expect (scannersTitle).toBeVisible();
      await expect (scannersTitle).toHaveText('Scanners');
    });


    test('Web Cameras : click', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const webCameras = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[5]/a');
      await expect (webCameras).toBeVisible();
      await webCameras.click();
      const webCamerasTitle = page.locator('//*[@id="content"]/h2');
      await expect (webCamerasTitle).toBeVisible();
      await expect (webCamerasTitle).toHaveText('Web Cameras');
    });


    test('Mice : amount of products', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const mice = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[1]/a');
      const amountInMenu = Number((await mice.innerText()).match(/\d+/)[0]);
      await expect (mice).toBeVisible();
      await mice.click();
      const miceTitle = page.locator('//*[@id="content"]/h2');
      await expect (miceTitle).toBeVisible();
      await expect (miceTitle).toHaveText('Mice and Trackballs');
      let products = null;
      try {
        products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
        products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });



    test('Monitors : amount of products', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const monitors = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[2]/a');
      const amountInMenu = Number((await monitors.innerText()).match(/\d+/)[0]);
      await expect (monitors).toBeVisible();
      await monitors.click();
      const monitorsTitle = page.locator('//*[@id="content"]/h2');
      await expect (monitorsTitle).toBeVisible();
      await expect (monitorsTitle).toHaveText('Monitors');
      let products = null;
      try {
        products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
        products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('Printers : amount of products', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const printers = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[3]/a');
      const amountInMenu = Number((await printers.innerText()).match(/\d+/)[0]);
      await expect (printers).toBeVisible();
      await printers.click();
      const printersTitle = page.locator('//*[@id="content"]/h2');
      await expect (printersTitle).toBeVisible();
      await expect (printersTitle).toHaveText('Printers');
      let products = null;
      try {
        products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
        products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('Scanners : amount of products', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const scanners = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[4]/a');
      const amountInMenu = Number((await scanners.innerText()).match(/\d+/)[0]);
      await expect (scanners).toBeVisible();
      await scanners.click();
      const scannersTitle = page.locator('//*[@id="content"]/h2');
      await expect (scannersTitle).toBeVisible();
      await expect (scannersTitle).toHaveText('Scanners');
      let products = null;
      try {
        products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
        products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('Web Cameras : amount of products', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const webCameras = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/div/ul/li[5]/a');
      const amountInMenu = Number((await webCameras.innerText()).match(/\d+/)[0]);
      await expect (webCameras).toBeVisible();
      await webCameras.click();
      const webCamerasTitle = page.locator('//*[@id="content"]/h2');
      await expect (webCamerasTitle).toBeVisible();
      await expect (webCamerasTitle).toHaveText('Web Cameras');
      let products = null;
      try {
        products = await page.locator('.product-thumb').elementHandles();
      } catch (error) {
        products = [];
      }
      const amountInThePage = products.length;
      await expect (amountInThePage).toBe(amountInMenu);
    });


    test('Show all products', async ({ page }) => {
      const components = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/a');
      await components.click();
      const showAll = page.locator('//*[@id="menu"]/div[2]/ul/li[3]/div/a');
      await expect (showAll).toBeVisible();
      await showAll.click();
      const allComponentsTitle = page.locator('//*[@id="content"]/h2');
      await expect (allComponentsTitle).toBeVisible();
      await expect (allComponentsTitle).toHaveText('Components');
    });
  });


  test.skip('Tablets', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });

    test('Click', async ({ page }) => {
      const tablets = page.locator('//*[@id="menu"]/div[2]/ul/li[4]/a');
      await expect (tablets).toBeVisible();
      await tablets.click();
      const tabletsTitle = page.locator('//*[@id="content"]/h2');
      await expect (tabletsTitle).toBeVisible();
      await expect (tabletsTitle).toHaveText('Tablets');
    });
  });

  test.skip('Software', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });

    test('Click', async ({ page }) => {
      const software = page.locator('//*[@id="menu"]/div[2]/ul/li[5]/a');
      await expect (software).toBeVisible();
      await software.click();
      const softwareTitle = page.locator('//*[@id="content"]/h2');
      await expect (softwareTitle).toBeVisible();
      await expect (softwareTitle).toHaveText('Software');
    });
  });


  test.skip('Phones & PDAs', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });

    test('Click', async ({ page }) => {
      const phones = page.locator('//*[@id="menu"]/div[2]/ul/li[6]/a');
      await expect (phones).toBeVisible();
      await phones.click();
      const phonesTitle = page.locator('//*[@id="content"]/h2');
      await expect (phonesTitle).toBeVisible();
      await expect (phonesTitle).toHaveText('Phones & PDAs');
    });
  });


  test.skip('Cameras', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });

    test('Click', async ({ page }) => {
      const cameras = page.locator('//*[@id="menu"]/div[2]/ul/li[7]/a');
      await expect (cameras).toBeVisible();
      await cameras.click();
      const camerasTitle = page.locator('//*[@id="content"]/h2');
      await expect (camerasTitle).toBeVisible();
      await expect (camerasTitle).toHaveText('Cameras');
    });
  });

  test.describe('MP3 Players', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('');
    });

    test('Hover', async ({ page }) => {
      const mp3 = page.locator('//*[@id="menu"]/div[2]/ul/li[8]/a');
      await expect (mp3).toBeVisible();
      await mp3.hover();
      const test1 = page.locator('//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[1]/li[1]/a');
      const test2 = page.locator('//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[2]/li[5]/a');
      await expect (test1).toBeVisible();
      await expect (test2).toBeVisible();
    });


    // test('test', async ({ page }) => {
    //   const mp3 = page.locator('//*[@id="menu"]/div[2]/ul/li[8]/a');
    //   await mp3.click();
    //   let test1 = await page.locator('//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[1]/li').elementHandles();
    //   let test2 = await page.locator('//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[2]/li').elementHandles();
    //   let test3 = await page.locator('//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[3]/li').elementHandles();
    //   let test4 = await page.locator('//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[4]/li').elementHandles();
    //   let tests = test1.concat(test2, test3, test4);
    //   console.log(tests.length);
    //   for (let i of tests){
        
    //     await mp3.click();

        
    //     console.log(await i.innerText());
    //     await i.click();
    //   }
      
      

      // for (let i = 1; i < 5; i++){
      //   if (i == 4){
      //     for (let j = 1; j < 4; j++){
      //       await page.locator('//*[@id="menu"]/div[2]/ul/li[8]/a').click(); 
      //       const test = page.locator(`//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[${i}]/li${j}/a`);
      //       let title = await test.innerText();
      //       console.log(title);
      //       await test.click();
      //       const testTitle = page.locator('//*[@id="content"]/h2');
      //       await expect (testTitle).toBeVisible();
      //       await expect (testTitle).toContainText(title.slice(0, -4));
      //     }
      //   }
      //   else{
      //     for (let j = 1; j < 6; j++){
      //       await page.locator('//*[@id="menu"]/div[2]/ul/li[8]/a').click(); 
      //       const test = page.locator(`//*[@id="menu"]/div[2]/ul/li[8]/div/div/ul[${i}]/li${j}/a`);
      //       let title = await test.innerText();            
      //       console.log(title);
      //       await test.click();
      //       const testTitle = page.locator('//*[@id="content"]/h2');
      //       await expect (testTitle).toBeVisible();
      //       await expect (testTitle).toContainText(title.slice(0, -4));
      //     }
        // }
      // }
    });


    test('Show all products', async ({ page }) => {
      const mp3 = page.locator('//*[@id="menu"]/div[2]/ul/li[8]/a');
      await expect (mp3).toBeVisible();
      await mp3.click();
      const showAll = page.locator('//*[@id="menu"]/div[2]/ul/li[8]/div/a');
      await expect (showAll).toBeVisible();
      await showAll.click();
      const allMp3Title = page.locator('//*[@id="content"]/h2');
      await expect (allMp3Title).toBeVisible();
      await expect (allMp3Title).toHaveText('MP3 Players');
    });



  });
  


});