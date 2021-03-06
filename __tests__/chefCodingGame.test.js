const { makeDish } = require('../src/chefCodingGame');
describe('Chef dish Challenge from codingame', () => {

   test('No of days should be 1<= days <= 20 : ', () => {
      const totalDays = 0;
      const maxIngCount = 3;
      const output = makeDish(null, totalDays, maxIngCount);
      expect(undefined).toBe(output);
   });

   test('No of ingridient Count should be 1<= ingridient <= 20 : ', () => {
      const totalDays = 5;
      const maxIngCount = 21;
      const output = makeDish(null, totalDays, maxIngCount);
      expect(undefined).toBe(output);
   });
   
   test('Inputs length should be equal to totalNumberOfDays : ', () => {
      const totalDays = 5;
      const maxIngCount = 21;
      const inputs = 'A B C D';
      const output = makeDish(inputs, totalDays, maxIngCount);
      expect(undefined).toBe(output);
   });

   test('Inputs Name should start with FIBER, FAT, CARB and condition should be met, 6 >= Name <= 20 ', () => {
      const inputs = 'FATOil FIBERSpinach FATno CARBRice FATCheese FIBERBeans'.split(' ');
      const expectedOutput = '----FATOil:FIBERSpinach:FATCheese-';
      const totalDays = 6;
      const maxIngCount = 3;
      const output = makeDish(inputs, totalDays, maxIngCount);
      expect(expectedOutput).toBe(output);
   });

   test('case 1: ', () => {
      const inputs = 'FATOil FIBERSpinach CARBRice FATCheese FIBERBeans'.split(' ');
      const expectedOutput = '---FATOil:FIBERSpinach:FATCheese-';
      const totalDays = 5;
      const maxIngCount = 3;
      const output = makeDish(inputs, totalDays, maxIngCount);
      expect(expectedOutput).toBe(output);
   });

   test('case 2: ', () => {
      const inputs = 'FATOil FATCheese FATEgg FIBERSpinach CARBRice FIBERBeans'.split(' ');
      const expectedOutput = '--FATOil:FATCheese:FATEgg--FIBERSpinach:CARBRice:FIBERBeans';
      const totalDays = 6;
      const maxIngCount = 3;
      const output = makeDish(inputs, totalDays, maxIngCount);
      expect(expectedOutput).toBe(output);
   })


   test('case 3: ', () => {
      const inputs = 'FATOil FIBERSpinach CARBRice FATCheese FIBERBeans FATEgg FIBERBroccoli CARBPotato CARBCorn FATOlive FIBERCarrot CARBBeetroot'.split(' ');
      const expectedOutput = '-----FATOil:FIBERSpinach:FATCheese:FATEgg--CARBRice:FIBERBeans:CARBPotato:CARBCorn---';
      const totalDays = 12;
      const maxIngCount = 4;
      const output = makeDish(inputs, totalDays, maxIngCount);
      expect(expectedOutput).toBe(output);
   })

   test('case 4: ', () => {
      const inputs = 'FIBERBroccoli CARBRice CARBOat FATEgg FATCoconut CARBCorn FIBERBeans FATCheese FATSalmon FIBERCarrot FIBERSpinach CARBQuinoa CARBPotato FIBERPumpkin FATOil FIBERBarley FATOlive CARBWheat'.split(' ');
      const expectedOutput = '-----FIBERBroccoli:CARBRice:CARBOat:CARBCorn-FATEgg:FATCoconut:FIBERBeans:FATCheese-----FATSalmon:FIBERCarrot:FIBERSpinach:FIBERPumpkin---CARBQuinoa:CARBPotato:FATOil:CARBWheat';
      const totalDays = 18;
      const maxIngCount = 4;
      const output = makeDish(inputs, totalDays, maxIngCount);
      expect(expectedOutput).toBe(output);
   })

   test('case 5: ', () => {
      const inputs = 'FIBERBroccoli FATEgg FIBERPumpkin FATOil CARBPotato FATSalmon CARBWheat FATCheese FIBERSpinach CARBQuinoa CARBOat FATOlive CARBCorn FIBERCarrot CARBRice FATCoconut FIBERBeans FIBERBarley'.split(' ');
      const expectedOutput = '-----FIBERBroccoli:FATEgg:FIBERPumpkin:FATOil:FATSalmon---CARBPotato:CARBWheat:FATCheese:FIBERSpinach:CARBQuinoa----CARBOat:FATOlive:CARBCorn:FIBERCarrot:CARBRice---';
      const totalDays = 18;
      const maxIngCount = 5;
      const output = makeDish(inputs, totalDays, maxIngCount);
      expect(expectedOutput).toBe(output);
   })
});
