import 'cypress-mochawesome-reporter/register';

const url = 'http://192.168.115.15:99/'
const Username = '#username'
const Password = '#password'
const ReceiveNo = '#scanReceivePayNo'
const BoxStart = '#txtBoxStartPay'
const BoxEnd = '#txtBoxEndPay'
const SNStart = '#txtSnStartPay'
const SNEnd = '#txtSnEndPay'
const Check = '#SwitchesReceived'
const Cmb = '#cmbPriceGPay'
const BoxQty = '#txtBoxQtyPay'
const Total = '#snReceiveTotalPay'
const Stamp = '#txtStampTyp'

describe('TC15 Pay Create', function () { // Pass 19/19
  beforeEach(function() {
    cy.visit(url)
    cy.viewport(1280, 720)
    cy.get(Username).type('101610048').should('have.value','101610048')
    cy.get(Password).type('P@ssw0rd').should('have.value', 'P@ssw0rd')
    cy.get('button').contains('LOGIN').click()
    cy.url().should('include', 'Main?lang=EN')
    cy.get('a').contains('Receive Stamp').click()
    cy.url().should('include', 'ReceiveStamp?lang=EN')
    cy.get('button').contains(' Pay Create').click()
    cy.get('#dateCurrentpay').click()
    cy.get('a.ui-state-active').click()
  })

    it('TC15-001 ผู้ใช้งานสร้างใบ Pay ไม่กรอกข้อมูล ระบบแสดงการแจ้งเตือน', function() {
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Receive No !')
      cy.get('button').contains('OK').click()
    }) //Pass

    it('TC15-002 ผู้ใช้งานสร้างใบ Pay ไม่กรอกข้อมูล Receive No ระบบแสดงการแจ้งเตือน', function() {
      cy.get('#dateCurrentpay').click()
      cy.get('a.ui-state-active').click()
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Receive No !')
      cy.get('button').contains('OK').click()
    }) //Pass

    it('TC15-003 ผู้ใช้งานสร้างใบ Pay ไม่กรอกข้อมูล Box Start ระบบแสดงการแจ้งเตือน', function() {
      cy.get(ReceiveNo).type('PAY6700001').should('have.value','PAY6700001')
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Box Start !')
      cy.get('button').contains('OK').click()
    }) //Pass

     it('TC15-004 ผู้ใช้งานสร้างใบ Pay ไม่กรอกข้อมูล Box End ระบบแสดงการแจ้งเตือน', function() {
      cy.get(ReceiveNo).type('PAY6700001').should('have.value','PAY6700001')
      cy.get(BoxStart).type('1670P5001').should('have.value','1670P5001')
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Box End !')
      cy.get('button').contains('OK').click()
    }) //Pass

      it('TC15-005 ผู้ใช้งานสร้างใบ Pay กรอกข้อมูล Receive No ไม่ถูกต้อง ระบบแสดงการแจ้งเตือน', function() {
      // TC15-005-1 Test case 1: Short invalid input Pass
      cy.get(ReceiveNo).clear().type('xxx', { force: true })
      cy.get(ReceiveNo).should('have.value', 'xxx')
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Receive No 10 digit !').should('be.visible')
      cy.get('button').contains('OK').click()
      // TC15-005-2 Test case 2: Long invalid input Pass
      cy.get(ReceiveNo).should('be.visible').focus()
      cy.get(ReceiveNo).clear().type('xxxxxxxxxx', { force: true })
      cy.contains('Invalid Format ! xxxxxxxxxx ,Please input pattern "PAY0000001"').should('be.visible')
      cy.get('button').contains('OK').click()
      // TC15-005-3 Test case 3: Invalid with space Pass
      cy.get(ReceiveNo).clear().invoke('val', ' PAY6700001').trigger('input').trigger('change')
      cy.get(ReceiveNo).invoke('val').then((val) => {expect(val.trim()).to.equal('PAY6700001')
      })
    })

      it('TC15-006 ผู้ใช้งานสร้างใบ Pay เลือกวันที่ Receive ย้อนหลัง ระบบไม่เปิดให้เลือกวันที่ย้อนหลัง', function() {
      cy.get(ReceiveNo).type('PAY6700001').should('have.value', 'PAY6700001');
      // Verify today's date is selected (format: DD/MM/YYYY)
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
      cy.get('#dateCurrentpay').should('have.value', formattedDate);
      cy.get('#dateCurrentpay').click();
      // Verify previous dates are disabled
      cy.get('.ui-datepicker-calendar td.ui-datepicker-unselectable').should('exist').and('have.class', 'ui-state-disabled');
    })

      it('TC15-007 ผู้ใช้งานสร้างใบ Pay กรอกข้อมูล Box Start / End ไม่ถูกต้อง ระบบแสดงการแจ้งเตือน', function() {
      // tc15-007-1 Pass
      cy.get(ReceiveNo).type('PAY6700001').should('have.value', 'PAY6700001')
      cy.get(BoxStart).type('XXX').should('have.value','XXX')
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Box Start 9 digit!').should('be.visible')
      cy.get('button').contains('OK').click()
      // tc15-007-2 Pass
      cy.get(BoxStart).clear().type('1670P0001').should('have.value','1670P0001')
      cy.get(BoxEnd).type('XXX').should('have.value','XXX')
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Box End 9 digit!').should('be.visible')
      cy.get('button').contains('OK').click()
      // tc15-007-3 Pass
      cy.get(BoxStart).clear().type('1670P0001').should('have.value','1670P0001')
      cy.get(BoxEnd).clear().type('1670A1001').should('have.value','1670A1001')
      cy.contains('Character of BoxEnd "1670A" does not match to Character of BoxStart "1670P"').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(BoxStart).clear()
      cy.get(BoxEnd).clear()
      // tc15-007-4 Pass
      cy.get(BoxStart).type('1670P0000').should('have.value','1670P0000')
      cy.get(BoxEnd).type('1670P0000') // ข้อนี้ไม่สามารถเพิ่ม .should('have.value','1670P0000') ได้เนื่องจากระบบแสดงข้อความแจ้วเตือน Please Input running starting 0001 ! ทันทีที่กรอกข้อมูล
      cy.contains('Please Input running starting 0001 !').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(BoxStart).clear()
      cy.get(BoxEnd).clear()
      // tc15-007-5 Pass
      cy.get(BoxStart).type('111111111').should('have.value','111111111')
      cy.get(BoxEnd).type('111111111').should('have.value','111111111')
      cy.contains('Box Start OR Box End incorrect format!').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(BoxStart).clear()
      cy.get(BoxEnd).clear()
      // tc15-007-6 Pass
      cy.get(BoxEnd).type('1670A1001').should('have.value','1670A1001')
      cy.get(BoxStart).type('1670P0001').should('have.value','1670P0001')
      cy.contains('Character of BoxStart "1670P" does not match to Character of BoxEnd "1670A"').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(BoxStart).clear()
      cy.get(BoxEnd).clear()
      // tc15-007-7 Pass
      cy.get(BoxStart).type('1670S0001').should('have.value','1670S0001')
      cy.get(BoxEnd).type('1670S0365').should('have.value','1670S0365')
      cy.contains('Unable to specify stamp type. Please check again.').should('be.visible')
      cy.get('button').contains('OK').click()
    })

    it('TC15-008 ผู้ใช้งานสร้างใบ Pay กรอกข้อมูล Box Start มากกว่า End ระบบแสดงการแจ้งเตือน', function() {
      cy.get(ReceiveNo).clear().type('PAY6700001').should('have.value', 'PAY6700001')
      cy.get(BoxStart).type('1670P0005').should('have.value','1670P0005')
      cy.get(BoxEnd).type('1670P0001').should('have.value','1670P0001')
      cy.contains('BoxStart : 1670P0005 greater than BoxEnd : 1670P0001').should('be.visible')
      cy.get('button').contains('OK').click()
    }) //pass

    it('TC15-009 ผู้ใช้งานสร้างใบ Pay ไม่กรอกข้อมูล Price Group ระบบแสดงการแจ้งเตือน', function() {
      // Input test data
      cy.get(ReceiveNo).type('PAY6700001').should('have.value', 'PAY6700001')
      cy.get(BoxStart).type('1670P0001').should('have.value','1670P0001')
      cy.get(BoxEnd).type('1670P0020').should('have.value','1670P0020')
      cy.wait(2000)
      // Verify automatically calculated details
      cy.get(BoxQty).should('have.value', '20')
      cy.get(SNStart).should('have.value', 'P670000000001')
      cy.get(SNEnd).should('have.value', 'P670004000000')
      cy.get(Total).should('have.value', '4,000,000')
      // Verify PriceGroup validation
      cy.get('button').contains(' Add').click()
      cy.contains('Please input PriceGroup !').should('be.visible')
      cy.get('button').contains('OK').click()
   }) //pass

    it('TC15-010 ผู้ใช้งานสร้างใบ Pay กรณีไม่เต็มกล่อง กรอกข้อมูล SN End ไม่ถูกต้อง ระบบแสดงการแจ้งเตือน', function() {
      //tc15-010-1
      cy.get(ReceiveNo).clear().type('PAY2304252').should('have.value', 'PAY2304252')
      cy.get(Check).click({ force: true })
      cy.get(BoxStart).type('1680P0001').should('have.value','1680P0001')
      cy.get(BoxEnd).type('1680P0004').should('have.value','1680P0004')
      cy.get(SNEnd).clear()
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Sn End !').should('be.visible')
      cy.get('button').contains('OK').click() //pass
      //tc15-010-2
      cy.get(SNEnd).clear().type('xxx').should('have.value','xxx')
      cy.get('button').contains(' Add').click()
      cy.contains('Please input Sn End 13 digit!').should('be.visible')
      cy.get('button').contains('OK').click() //pass
      //tc15-010-3
      cy.get(SNEnd).clear().type('xx68000076000').should('have.value','xx68000076000')
      cy.contains('SN start digit P68 does not match to SN end digit XX6').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(Cmb).should('be.visible').select('70')
      cy.get('button').contains(' Add').click()
      cy.contains('Input string was not in a correct format.').should('be.visible')
      cy.get('button').contains('OK').click()
      //tc15-010-4
      cy.get(SNEnd).clear().type('p680000760000') // ข้อนี้ไม่สามารถเพิ่ม .should('have.value','p680000760000') ได้เนื่องจากระบบปรับตัวอักษรจากพิมพ์เล็ก เป็นพิมพ์ใหญ่ให้อัตโนมัติทันที่กรอกข้อมูล
      cy.get(SNEnd).invoke('val').then(val => {expect(val.toUpperCase()).to.eq('P680000760000')}) //pass
      //tc15-010-5
      cy.get(SNEnd).clear().type('x680000760000').should('have.value','x680000760000')
      cy.contains('SN start digit P68 does not match to SN end digit X68').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(Cmb).should('be.visible').select('70')
      cy.get('button').contains(' Add').click()
      cy.contains('Stamp X680000760000 incorrect format!').should('be.visible')
      cy.get('button').contains('OK').click() //pass
      //tc15-010-6
      cy.get(SNEnd).clear().type('P680000900000') // ข้อนี้ไม่สามารถเพิ่ม .should('have.value','P680000900000') ได้เนื่องจากระบบแสดงข้อความแจ้วเตือน Total of stamps is incorrect. ทันทีที่กรอกข้อมูล
      cy.contains("Total of stamps is incorrect.").should('be.visible')
      cy.get('button').contains('OK').click() //pass
      //tc15-010-7
      cy.get(SNEnd).clear().type('P800000800000').should('have.value','P800000800000')
      cy.contains('SN start digit P68 does not match to SN end digit P80').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(Cmb).should('be.visible').select('70')
      cy.get('button').contains(' Add').click()
      cy.contains('Stamp P800000800000 incorrect format!').should('be.visible')
      cy.get('button').contains('OK').click() //pass
   })

    it('TC15-011 ผู้ใช้งานสร้างใบ Pay กรณีไม่เต็มกล่อง กรอกข้อมูล SN End น้อยกว่า SNStart ระบบแสดงการแจ้งเตือน', function() {
      cy.get(ReceiveNo).clear().type('PAY2304252').should('have.value', 'PAY2304252')
      cy.get(Check).click({ force: true })
      cy.get(BoxStart).type('1680P0001').should('have.value','1680P0001')
      cy.get(BoxEnd).type('1680P0004').should('have.value','1680P0004')
      cy.get(SNEnd).clear().type('P680000000000').should('have.value','P680000000000')
      cy.contains('SnEnd is less than SnStart').should('be.visible')
      cy.get('button').contains('OK').click()
      cy.get(Cmb).should('be.visible').select('70')
      cy.get('button').contains(' Add').click()
      cy.contains('SnEnd is less than SnStart').should('be.visible')
      cy.get('button').contains('OK').click()
    }) //pass

    it('TC15-013 ผู้ใช้งานสร้างใบ Pay กรอกข้อมูลถูกต้อง ระบบแสดงรายการในตาราง', function() {
      // tc15-013-1-Pass
      cy.get(ReceiveNo).type('PAY6700002').should('have.value', 'PAY6700002')
      cy.get(BoxStart).type('1670P1001').should('have.value', '1670P1001')
      cy.get(BoxEnd).type('1670P1020').should('have.value', '1670P1020')
      cy.get(Cmb).should('be.visible').select('70')
      cy.get(BoxQty).should('have.value', '20')
      cy.get(SNStart).should('have.value', 'P670200000001')
      cy.get(SNEnd).should('have.value', 'P670204000000')
      cy.get(Total).should('have.value', '4,000,000')
      cy.get('button').contains(' Add').click()
      cy.contains('Create Payment Success').should('be.visible')
      cy.wait(3000)
      cy.get('#TBdetailReceivePay tbody tr').should('have.length.gte', 1)
      cy.get('#TBdetailReceivePay tbody tr').first().as('firstRow')
      cy.get('@firstRow').find('td').eq(0).should('contain.text', 'PAY6700002') // Receive No
      cy.get('@firstRow').find('td').eq(2).should('contain.text', '70') // Price Group
      cy.get('@firstRow').find('td').eq(3).should('contain.text', '1670P1001') // Box Start
      cy.get('@firstRow').find('td').eq(4).should('contain.text', '1670P1020') // Box End
      cy.get('@firstRow').find('td').eq(5).should('contain.text', '20') // Box Qty
      cy.get('@firstRow').find('td').eq(6).should('contain.text', 'P670200000001') // SN Start
      cy.get('@firstRow').find('td').eq(7).should('contain.text', 'P670204000000') // SN End
      cy.get('@firstRow').find('td').eq(8).should('contain.text', '4,000,000') // SN Qty
      cy.get('@firstRow').find('td').eq(9).should('contain.text', 'T&T') // Stamp Type
      // tc15-013-2-Pass
      cy.get(ReceiveNo).clear().type('PAY2304252').should('have.value', 'PAY2304252')
      cy.get('#dateCurrentpay').click()
      cy.get('a.ui-state-active').click()
      cy.get(Check).click({ force: true })
      cy.get(BoxStart).type('1680P0001').should('have.value','1680P0001')
      cy.get(BoxEnd).type('1680P0004').should('have.value','1680P0004')
      cy.get(SNEnd).clear().type('P680000780000').should('have.value','P680000780000')
      cy.get(Cmb).should('be.visible').select('70')
      cy.get(BoxQty).should('have.value', '4')
      cy.get(SNStart).should('have.value', 'P680000000001')
      cy.get(SNEnd).should('have.value', 'P680000780000')
      cy.get(Total).should('have.value', '780000')
      cy.get('button').contains(' Add').click()
      cy.contains('Create Payment Success').should('be.visible')
      cy.wait(3000)
      cy.get('#TBdetailReceivePay tbody tr').should('have.length.gte', 1)
      cy.get('#TBdetailReceivePay tbody tr').first().as('latestRow')
      cy.get('@latestRow').find('td').eq(0).should('contain.text', 'PAY2304252') // Receive No
      cy.get('@latestRow').find('td').eq(2).should('contain.text', '70') // Price Group
      cy.get('@latestRow').find('td').eq(3).should('contain.text', '1680P0001') // Box Start
      cy.get('@latestRow').find('td').eq(4).should('contain.text', '1680P0004') // Box End
      cy.get('@latestRow').find('td').eq(5).should('contain.text', '4') // Box Qty
      cy.get('@latestRow').find('td').eq(6).should('contain.text', 'P680000000001') // SN Start
      cy.get('@latestRow').find('td').eq(7).should('contain.text', 'P680000780000') // SN End
      cy.get('@latestRow').find('td').eq(8).should('contain.text', '780,000') // SN Qty
      cy.get('@latestRow').find('td').eq(9).should('contain.text', 'Phase 1') // Stamp Type
    })

      it('TC15-014 ผู้ใช้งานกรอก Username และ Password ที่มีสิทธิ์ตั้งค่า สามารถเข้าใช้งานเมนู Setting ได้', function() {
      // tc15-014-1
      cy.get(ReceiveNo).clear().type('PAY6700001').should('have.value', 'PAY6700001')
      cy.get(BoxStart).type('1670P0001').should('have.value','1670P0001')
      cy.get(BoxEnd).type('1670P0020').should('have.value','1670P0020')
      cy.get(Cmb).should('be.visible').select('70')
      cy.get('button').contains(' Add').click()
      cy.contains('Duplicate Data').should('be.visible')
      cy.get('button').contains('OK').click()
      // tc15-014-2
      cy.get(ReceiveNo).clear().type('PAY2304252').should('have.value', 'PAY2304252')
      cy.get(Check).click({ force: true })
      cy.get(BoxStart).type('1680P0001').should('have.value','1680P0001')
      cy.get(BoxEnd).type('1680P0004').should('have.value','1680P0004')
      cy.get(SNEnd).clear().type('P680000800000').should('have.value','P680000800000')
      cy.get(Cmb).should('be.visible').select('70')
      cy.get('button').contains(' Add').click()
      cy.contains('Duplicate Data').should('be.visible')
      cy.get('button').contains('OK').click()
    })//pass

      it('TC15-015 ผู้ใช้งานสร้างใบ Pay คลิกปุ่ม Reset ระบบเคลียร์ข้อมูลการสร้างใบ pay', function() {
      cy.get(ReceiveNo).type('PAY6700001').should('have.value', 'PAY6700001')
      cy.get(BoxStart).type('1670P0001').should('have.value','1670P0001')
      cy.get(BoxEnd).type('1670P0020').should('have.value','1670P0020')
      cy.get(Cmb).select('70')
      cy.get('#createPayModal').should('be.visible')
      cy.get('#createPayModal #btnReset').should('be.visible').click()
      // ตรวจสอบว่าข้อมูลถูกเคลียร์
      cy.get(ReceiveNo).should('have.value', '')
      cy.get(BoxStart).should('have.value', '')
      cy.get(BoxEnd).should('have.value', '')
      cy.get(Cmb).should('have.value', '')
  }); //pass

     it('TC15-016 ผู้ใช้งานลบข้อมูลรายการรับเข้า ระบบแสดงการแจ้งเตือน', function() {
      // tc15-016-1
      cy.get(ReceiveNo).type('PAY6700002').should('have.value', 'PAY6700002')
      cy.get('#createPayModal').within(() => {cy.get('button[id="btnEdit"]').first().click()})
      cy.contains("DeletePayment : Success ")
      cy.get('button').contains('OK').click()
      // tc15-016-2
      cy.get(ReceiveNo).clear().type('PAY2304253').should('have.value', 'PAY2304253')
      cy.get('#createPayModal').within(() => {cy.get('button[id="btnEdit"]').first().click()})
      cy.contains("DeletePayment : Success ")
      cy.get('button').contains('OK').click()
   })//pass

    it('TC15-017 ผู้ใช้งานตรวจสอบรับเข้าใบ Pay และลบข้อมูลรายการรับเข้า ระบบไม่เปิดให้ลบข้อมูล', function() {
    cy.get('#createPayModal').should('be.visible').within(() => {cy.get('button.close').click();});
    // เลือกวันที่เริ่มต้นที่มีใบ PAY6700001 
    // เปิด datepicker
    cy.get('#_startDate').click();
    cy.get('.ui-datepicker-year').should('contain', '2025');
    cy.get('.ui-datepicker-month').should('contain', 'September');
    cy.get('.ui-datepicker-calendar td a').contains('2').click();     
    // เลือกวันที่สิ้นสุดที่มีใบ PAY6700001 
    cy.get('#_endDate').click();
    cy.get('.ui-datepicker-year').should('contain', '2025');
    cy.get('.ui-datepicker-month').should('contain', 'September');
    cy.get('.ui-datepicker-calendar td a').contains('2').click();
    cy.get('#btnSearch').click();
    cy.get('#btnView').click();
    cy.get('#createReceiveModal').should('be.visible')
    cy.get('#scanReceiveNo').should('have.value','PAY6700001')
    cy.get('#receiveID').should('have.value','R2250902001')
    cy.get('#txtSnStart').should('have.value','P670000000001')
    cy.get('#txtSnEnd').should('have.value', 'P670004000000')
    cy.get('#snReceiveTotal').should('have.value', '4,000,000')
    cy.get('#receiveDateShow').should('have.value', '02/09/2025')
    cy.get('#createReceiveModal').should('be.visible').within(() => {cy.get('button.close').click();})
    cy.get('button').contains(' Pay Create').click()
    cy.get(ReceiveNo).type('PAY6700001').should('have.value', 'PAY6700001');
    cy.get('#createPayModal').within(() => {cy.get('button[id="btnEdit"]').first().click()})
    cy.contains("Receive No has been used! ,Can't be Delete")
    cy.get('button').contains('OK').click()
  })//pass

    it('TC15-018 ผู้ใช้งานสร้างใบ Pay กรอกข้อมูลช่วงแสตมป์ซ้ำ ระบบแสดงการแจ้งเตือน', function() {
    //tc15-018-1
    cy.get(ReceiveNo).type('PAY6700001').should('have.value', 'PAY6700001')
    cy.get(BoxStart).type('1670P0002"').should('have.value','1670P0002')
    cy.get(BoxEnd).type('1670P0003').should('have.value','1670P0003')
    cy.get(Cmb).should('be.visible').select('70')
    cy.get(BoxQty).should('have.value', '2')
    cy.get(SNStart).should('have.value', 'P670000200001')
    cy.get(SNEnd).should('have.value', 'P670000600000')
    cy.get(Total).should('have.value', '400,000')
    cy.get('button').contains(' Add').click()
    cy.contains('Duplicate Data').should('be.visible')
    cy.get('button').contains('OK').click()
    //tc15-018-2
    cy.get(ReceiveNo).clear().type('PAY2304252').should('have.value', 'PAY2304252')
    cy.get(Check).click({ force: true })
    cy.get(BoxStart).type('1680P0002').should('have.value','1680P0002')
    cy.get(BoxEnd).type('1680P0003').should('have.value','1680P0003')
    cy.get(SNEnd).clear().type('P680000600000').should('have.value','P680000600000')
    cy.get(Cmb).should('be.visible').select('70')
    cy.get(BoxQty).should('have.value', '2')
    cy.get(SNStart).should('have.value', 'P680000200001')
    cy.get(SNEnd).should('have.value', 'P680000600000')
    cy.get(Total).should('have.value', '400000')
    cy.get('button').contains(' Add').click()
    cy.contains('Duplicate Data').should('be.visible')
    cy.get('button').contains('OK').click()
  })//pass

  it('TC15-019 ผู้ใช้งานสร้างใบ Pay 1 Stamp Type ระบบแสดงรายการในตาราง', function() {
    // tc15-019-1-Pass T&T Pass
    cy.get(ReceiveNo).type('PAY6700002').should('have.value', 'PAY6700002')
    cy.get(BoxStart).type('1670P0101').should('have.value','1670P0101')
    cy.get(BoxEnd).type('1670P0120').should('have.value','1670P0120')
    cy.get(Cmb).should('be.visible').select('70')
    cy.get(BoxQty).should('have.value', '20')
    cy.get(SNStart).should('have.value', 'P670020000001')
    cy.get(SNEnd).should('have.value', 'P670024000000')
    cy.get(Total).should('have.value', '4,000,000')
    cy.get(Stamp).should('have.value', 'Track & Trace')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    //1.2 Pass
    cy.get(BoxStart).type('1670S0361').should('have.value','1670S0361')
    cy.get(BoxEnd).type('1670S0365').should('have.value','1670S0365')
    cy.get(Cmb).should('be.visible').select('105')
    cy.get(BoxQty).should('have.value', '5')
    cy.get(SNStart).should('have.value', 'S670072000001')
    cy.get(SNEnd).should('have.value', 'S670073000000')
    cy.get(Total).should('have.value', '1,000,000')
    cy.get(Stamp).should('have.value', 'Track & Trace')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    // tc15-019-2-Pass Phase1
    cy.get(ReceiveNo).clear().type('PAY2304253').should('have.value', 'PAY2304253')
    cy.get(Check).click({ force: true })
    cy.get(BoxStart).type('1610P2001').should('have.value','1610P2001')
    cy.get(BoxEnd).type('1610P2004').should('have.value','1610P2004')
    cy.get(SNEnd).clear().type('P610400760000').should('have.value','P610400760000')
    cy.get(Cmb).should('be.visible').select('105')
    cy.get(BoxQty).should('have.value', '4')
    cy.get(SNStart).should('have.value', 'P610400000001')
    cy.get(SNEnd).should('have.value', 'P610400760000')
    cy.get(Total).should('have.value', '760000')
    cy.get(Stamp).should('have.value', 'Phase 1')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    //2.2 Pass
    cy.get(BoxStart).clear().type('1610S0001').should('have.value','1610S0001')
    cy.get(BoxEnd).clear().type('1610S0003').should('have.value','1610S0003')
    cy.get(SNEnd).clear().type('S610000520000').should('have.value','S610000520000')
    cy.get(Cmb).should('be.visible').select('70')
    cy.get(BoxQty).should('have.value', '3')
    cy.get(SNStart).should('have.value', 'S610000000001')
    cy.get(SNEnd).should('have.value', 'S610000520000')
    cy.get(Total).should('have.value', '520000')
    cy.get(Stamp).should('have.value', 'Phase 1')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
  })

    it('TC15-020 ผู้ใช้งานสร้างใบ Pay มากกว่า 1 Stamp Type ระบบแสดงรายการในตาราง', function() { //pass
    // tc15-020-1 T&T 
    cy.get(ReceiveNo).type('PAY6700003').should('have.value', 'PAY6700003')
    cy.get(BoxStart).type('1670P0121').should('have.value','1670P0121')
    cy.get(BoxEnd).type('1670P0125').should('have.value','1670P0125')
    cy.get(Cmb).should('be.visible').select('70')
    cy.get(BoxQty).should('have.value', '5')
    cy.get(SNStart).should('have.value', 'P670024000001')
    cy.get(SNEnd).should('have.value', 'P670025000000')
    cy.get(Total).should('have.value', '1,000,000')
    cy.get(Stamp).should('have.value', 'Track & Trace')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    //1.2 Phase1
    cy.get(BoxStart).type('1670S0001').should('have.value','1670S0001')
    cy.get(BoxEnd).type('1670S0005').should('have.value','1670S0005')
    cy.get(Cmb).should('be.visible').select('105')
    cy.get(BoxQty).should('have.value', '5')
    cy.get(SNStart).should('have.value', 'S670000000001')
    cy.get(SNEnd).should('have.value', 'S670001000000')
    cy.get(Total).should('have.value', '1,000,000')
    cy.get(Stamp).should('have.value', 'Phase 1')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    //1.3 T&T
    cy.get(BoxStart).clear().type('1670S0366').should('have.value','1670S0366')
    cy.get(BoxEnd).clear().type('1670S0370').should('have.value','1670S0370')
    cy.get(Cmb).should('be.visible').select('105')
    cy.get(BoxQty).should('have.value', '5')
    cy.get(SNStart).should('have.value', 'S670073000001')
    cy.get(SNEnd).should('have.value', 'S670074000000')
    cy.get(Total).should('have.value', '1,000,000')
    cy.get(Stamp).should('have.value', 'Track & Trace')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    // tc15-020-2 Phase1
    cy.get(ReceiveNo).clear().type('PAY2304254').should('have.value', 'PAY2304254')
    cy.get(Check).click({ force: true })
    cy.get(BoxStart).type('1670P0301').should('have.value','1670P0301')
    cy.get(BoxEnd).type('1670P0305').should('have.value','1670P0305')
    cy.get(SNEnd).clear().type('P670060840000').should('have.value','P670060840000')
    cy.get(Cmb).should('be.visible').select('70')
    cy.get(BoxQty).should('have.value', '5')
    cy.get(SNStart).should('have.value', 'P670060000001')
    cy.get(SNEnd).should('have.value', 'P670060840000')
    cy.get(Total).should('have.value', '840000')
    cy.get(Stamp).should('have.value', 'Track & Trace')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    //2.2 T&T
    cy.get(BoxStart).clear().type('1610P2006').should('have.value','1610P2006')
    cy.get(BoxEnd).clear().type('1610P2010').should('have.value','1610P2010')
    cy.get(SNEnd).clear().type('P610401880000').should('have.value','P610401880000')
    cy.get(Cmb).should('be.visible').select('105')
    cy.get(BoxQty).should('have.value', '5')
    cy.get(SNStart).should('have.value', 'P610401000001')
    cy.get(SNEnd).should('have.value', 'P610401880000')
    cy.get(Total).should('have.value', '880000')
    cy.get(Stamp).should('have.value', 'Phase 1')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
    cy.wait(5000)
    //2.3 Phase1
    cy.get(BoxStart).clear().type('1670P0021').should('have.value','1670P0021')
    cy.get(BoxEnd).clear().type('1670P0025').should('have.value','1670P0025')
    cy.get(SNEnd).clear().type('P670004800000').should('have.value','P670004800000')
    cy.get(Cmb).should('be.visible').select('105')
    cy.get(BoxQty).should('have.value', '5')
    cy.get(SNStart).should('have.value', 'P670004000001')
    cy.get(SNEnd).should('have.value', 'P670004800000')
    cy.get(Total).should('have.value', '800000')
    cy.get(Stamp).should('have.value', 'Track & Trace')
    cy.get('button').contains(' Add').click()
    cy.contains('Create Payment Success').should('be.visible')
  })
})