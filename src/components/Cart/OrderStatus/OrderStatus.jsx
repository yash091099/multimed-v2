import React from 'react'
import './OrderStatus.css'
import { useNavigate } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
const GET_WALLET_BALANCE = gql`
  query GetWalletBalance {
    getWalletBalance {
      status
      message
      walletBalance
    }
  }
`;
const OrderStatus = (props) => {
  const navigate=useNavigate();
  const { loading: balanceLoading, error: balanceError, data: balanceData, refetch: refetchBalance } = useQuery(GET_WALLET_BALANCE);
  const walletBalance = balanceData?.getWalletBalance?.walletBalance;

  return (
    <div className="order-status-container">

      <div className="order-status-frame215">
        <div className="order-status-frame471">
          <div className="order-status-frame470">
            <span className="order-status-text 14Medium">
              <span>Order on the way : Expected to arrive by 3pm, 11 Sep</span>
            </span>
          </div>
          <div className="order-status-frame381">
            <span className="order-status-text002 16Medium">
              <span>12399102XDJJ</span>
            </span>
            <div className="order-status-frame460">
              <div className="order-status-frame278">
                <span className="order-status-text004 10RegularItalic">
                  <span>Date of order</span>
                </span>
                <span className="order-status-text006 12Medium">
                  <span>11th March 2024</span>
                </span>
              </div>
              <div className="order-status-frame2781">
                <span className="order-status-text008 10RegularItalic">
                  <span>Total No items</span>
                </span>
                <span className="order-status-text010 12Medium">
                  <span>10</span>
                </span>
              </div>
            </div>
            <span className="order-status-text012 14Medium">
              <span>Download Invoice</span>
            </span>
          </div>
        </div>
        <div className="order-status-frame469">
          <div className="order-status-frame332">
            <div className="order-status-frame384">
              <span className="order-status-text014 12MediumCaps">
                <span>Prescription Items</span>
              </span>
              <div className="order-status-frame3841">
                <div className="order-status-frame281">
                  <div className="order-status-frame269">
                    <div className="order-status-interface-essential-done-check">
                      <div className="order-status-group">
                        <div className="order-status-group01">
                          <img
                            alt="PathI519"
                            src="/external/pathi519-gomf.svg"
                            className="order-status-path"
                          />
                          <img
                            alt="PathI519"
                            src="/external/pathi519-1wcm.svg"
                            className="order-status-path01"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="order-status-text016 14Regular">
                      <span>Prescription Needed</span>
                    </span>
                  </div>
                  <div className="order-status-frame379">
                    <div className="order-status-frame182">
                      <div className="order-status-frame177">
                        <div className="order-status-frame218"></div>
                      </div>
                      <div className="order-status-frame178">
                        <span className="order-status-text018 14Medium">
                          <span>Dolonext DT</span>
                        </span>
                        <span className="order-status-text020 14Regular">
                          <span>1 strip : 15 capsules x 1</span>
                        </span>
                      </div>
                    </div>
                    <div className="order-status-frame296">
                      <div className="order-status-frame2782">
                        <span className="order-status-text022 10RegularItalic">
                          <span>Manufacturer</span>
                        </span>
                        <div className="order-status-frame284">
                          <div className="order-status-frame283">
                            <span className="order-status-text024 10RegularItalic">
                              <span>Pfizer Ltd</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="order-status-frame279">
                        <span className="order-status-text026 10RegularItalic">
                          <span>Composition</span>
                        </span>
                        <div className="order-status-frame28301">
                          <span className="order-status-text028 10RegularItalic">
                            <span>Piroxicam (20mg)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="order-status-frame382">
                      <div className="order-status-frame380">
                        <div className="order-status-frame180">
                          <span className="order-status-text030">
                            <span className="order-status-text031">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: ' ',
                                }}
                              />
                            </span>
                            <span>Rs1432</span>
                          </span>
                          <span className="order-status-text033 14Medium">
                            <span>Rs 1243</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-status-frame285">
                  <div className="order-status-frame2691">
                    <div className="order-status-interface-essential-done-check1">
                      <div className="order-status-group02">
                        <div className="order-status-group03">
                          <img
                            alt="PathI519"
                            src="/external/pathi519-91n9.svg"
                            className="order-status-path02"
                          />
                          <img
                            alt="PathI519"
                            src="/external/pathi519-5dy4.svg"
                            className="order-status-path03"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="order-status-text035 14Regular">
                      <span>Prescription Needed</span>
                    </span>
                  </div>
                  <div className="order-status-frame3791">
                    <div className="order-status-frame1821">
                      <div className="order-status-frame1771">
                        <div className="order-status-frame2181"></div>
                      </div>
                      <div className="order-status-frame1781">
                        <span className="order-status-text037 14Medium">
                          <span>Dolonext DT</span>
                        </span>
                        <span className="order-status-text039 14Regular">
                          <span>1 strip : 15 capsules x 1</span>
                        </span>
                      </div>
                    </div>
                    <div className="order-status-frame2961">
                      <div className="order-status-frame2783">
                        <span className="order-status-text041 10RegularItalic">
                          <span>Manufacturer</span>
                        </span>
                        <div className="order-status-frame2841">
                          <div className="order-status-frame28302">
                            <span className="order-status-text043 10RegularItalic">
                              <span>Pfizer Ltd</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="order-status-frame2791">
                        <span className="order-status-text045 10RegularItalic">
                          <span>Composition</span>
                        </span>
                        <div className="order-status-frame28303">
                          <span className="order-status-text047 10RegularItalic">
                            <span>Piroxicam (20mg)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="order-status-frame3821">
                      <div className="order-status-frame3801">
                        <div className="order-status-frame1801">
                          <span className="order-status-text049">
                            <span className="order-status-text050">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: ' ',
                                }}
                              />
                            </span>
                            <span>Rs1432</span>
                          </span>
                          <span className="order-status-text052 14Medium">
                            <span>Rs 1243</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-status-frame383">
              <span className="order-status-text054 12MediumCaps">
                <span>Products</span>
              </span>
              <div className="order-status-frame472">
                <div className="order-status-frame2851">
                  <div className="order-status-frame3792">
                    <div className="order-status-frame1822">
                      <div className="order-status-frame1772">
                        <div className="order-status-frame2182"></div>
                      </div>
                      <div className="order-status-frame1782">
                        <span className="order-status-text056 14Medium">
                          <span>Dolonext DT</span>
                        </span>
                        <span className="order-status-text058 14Regular">
                          <span>1 strip : 15 capsules x 1</span>
                        </span>
                      </div>
                    </div>
                    <div className="order-status-frame2962">
                      <div className="order-status-frame2784">
                        <span className="order-status-text060 10RegularItalic">
                          <span>Manufacturer</span>
                        </span>
                        <div className="order-status-frame2842">
                          <div className="order-status-frame28304">
                            <span className="order-status-text062 10RegularItalic">
                              <span>Pfizer Ltd</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="order-status-frame280">
                        <span className="order-status-text064 10RegularItalic">
                          <span>Country of Origin</span>
                        </span>
                        <div className="order-status-frame28305">
                          <span className="order-status-text066 10RegularItalic">
                            <span>India</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="order-status-frame3822">
                      <div className="order-status-frame3802">
                        <div className="order-status-frame1802">
                          <span className="order-status-text068">
                            <span className="order-status-text069">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: ' ',
                                }}
                              />
                            </span>
                            <span>Rs1432</span>
                          </span>
                          <span className="order-status-text071 14Medium">
                            <span>Rs 1243</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-status-frame385">
                  <div className="order-status-frame3793">
                    <div className="order-status-frame1823">
                      <div className="order-status-frame1773">
                        <div className="order-status-frame2183"></div>
                      </div>
                      <div className="order-status-frame1783">
                        <span className="order-status-text073 14Medium">
                          <span>Dolonext DT</span>
                        </span>
                        <span className="order-status-text075 14Regular">
                          <span>1 strip : 15 capsules x 1</span>
                        </span>
                      </div>
                    </div>
                    <div className="order-status-frame2963">
                      <div className="order-status-frame2785">
                        <span className="order-status-text077 10RegularItalic">
                          <span>Manufacturer</span>
                        </span>
                        <div className="order-status-frame2843">
                          <div className="order-status-frame28306">
                            <span className="order-status-text079 10RegularItalic">
                              <span>Pfizer Ltd</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="order-status-frame2792">
                        <span className="order-status-text081 10RegularItalic">
                          <span>Country of Origin</span>
                        </span>
                        <div className="order-status-frame28307">
                          <span className="order-status-text083 10RegularItalic">
                            <span>India</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="order-status-frame3823">
                      <div className="order-status-frame3803">
                        <div className="order-status-frame1803">
                          <span className="order-status-text085">
                            <span className="order-status-text086">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: ' ',
                                }}
                              />
                            </span>
                            <span>Rs1432</span>
                          </span>
                          <span className="order-status-text088 14Medium">
                            <span>Rs 1243</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-status-frame386">
                  <div className="order-status-frame3794">
                    <div className="order-status-frame1824">
                      <div className="order-status-frame1774">
                        <div className="order-status-frame2184"></div>
                      </div>
                      <div className="order-status-frame1784">
                        <span className="order-status-text090 14Medium">
                          <span>Dolonext DT</span>
                        </span>
                        <span className="order-status-text092 14Regular">
                          <span>1 strip : 15 capsules x 1</span>
                        </span>
                      </div>
                    </div>
                    <div className="order-status-frame2964">
                      <div className="order-status-frame2786">
                        <span className="order-status-text094 10RegularItalic">
                          <span>Manufacturer</span>
                        </span>
                        <div className="order-status-frame2844">
                          <div className="order-status-frame28308">
                            <span className="order-status-text096 10RegularItalic">
                              <span>Pfizer Ltd</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="order-status-frame2793">
                        <span className="order-status-text098 10RegularItalic">
                          <span>Country of Origin</span>
                        </span>
                        <div className="order-status-frame28309">
                          <span className="order-status-text100 10RegularItalic">
                            <span>India</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="order-status-frame3824">
                      <div className="order-status-frame3804">
                        <div className="order-status-frame1804">
                          <span className="order-status-text102">
                            <span className="order-status-text103">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: ' ',
                                }}
                              />
                            </span>
                            <span>Rs1432</span>
                          </span>
                          <span className="order-status-text105 14Medium">
                            <span>Rs 1243</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-status-frame387">
                  <div className="order-status-frame3795">
                    <div className="order-status-frame1825">
                      <div className="order-status-frame1775">
                        <div className="order-status-frame2185"></div>
                      </div>
                      <div className="order-status-frame1785">
                        <span className="order-status-text107 14Medium">
                          <span>Dolonext DT</span>
                        </span>
                        <span className="order-status-text109 14Regular">
                          <span>1 strip : 15 capsules x 1</span>
                        </span>
                      </div>
                    </div>
                    <div className="order-status-frame2965">
                      <div className="order-status-frame2787">
                        <span className="order-status-text111 10RegularItalic">
                          <span>Manufacturer</span>
                        </span>
                        <div className="order-status-frame2845">
                          <div className="order-status-frame28310">
                            <span className="order-status-text113 10RegularItalic">
                              <span>Pfizer Ltd</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="order-status-frame2794">
                        <span className="order-status-text115 10RegularItalic">
                          <span>Country of Origin</span>
                        </span>
                        <div className="order-status-frame28311">
                          <span className="order-status-text117 10RegularItalic">
                            <span>India</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="order-status-frame3825">
                      <div className="order-status-frame3805">
                        <div className="order-status-frame1805">
                          <span className="order-status-text119">
                            <span className="order-status-text120">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: ' ',
                                }}
                              />
                            </span>
                            <span>Rs1432</span>
                          </span>
                          <span className="order-status-text122 14Medium">
                            <span>Rs 1243</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-status-frame288">
            <div className="order-status-prescriptionprescriptionapplied">
              <div className="order-status-frame398">
                <div className="order-status-frame3851">
                  <div className="order-status-interface-essential-done-check2">
                    <div className="order-status-group04">
                      <div className="order-status-group05">
                        <img
                          alt="PathI519"
                          src="/external/pathi519-on4p.svg"
                          className="order-status-path04"
                        />
                        <img
                          alt="PathI519"
                          src="/external/pathi519-17h.svg"
                          className="order-status-path05"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="order-status-text124 16Medium">
                    <span>Prescription</span>
                  </span>
                </div>
                <span className="order-status-text126 12Medium">
                  <span>Why do we need a prescription?</span>
                </span>
              </div>
              <div className="order-status-frame2692">
                <div className="order-status-frame402">
                  <div className="order-status-interface-essential-done-check3">
                    <div className="order-status-group06">
                      <div className="order-status-group07">
                        <img
                          alt="PathI519"
                          src="/external/pathi519-hpev.svg"
                          className="order-status-path06"
                        />
                        <img
                          alt="PathI519"
                          src="/external/pathi519-jlj.svg"
                          className="order-status-path07"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="order-status-text128 14Regular">
                    <span>Prescription uploaded : XDAHAollalsps..... .pdf</span>
                  </span>
                </div>
              </div>
              <div className="order-status-frame395">
                <div className="order-status-frame12">
                  <span className="order-status-text130 14Medium">
                    <span>Save this prescription</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="order-status-applycoupon-couponapplied">
              <div className="order-status-frame401">
                <div className="order-status-content-edit-document">
                  <div className="order-status-group08">
                    <div className="order-status-group09">
                      <img
                        alt="PathI519"
                        src="/external/pathi519-xw.svg"
                        className="order-status-path08"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-ormk.svg"
                        className="order-status-path09"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-rmwe.svg"
                        className="order-status-path10"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-x2id.svg"
                        className="order-status-path11"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-9zac.svg"
                        className="order-status-path12"
                      />
                    </div>
                  </div>
                </div>
                <span className="order-status-text132 16Medium">
                  <span>Bill Summary</span>
                </span>
              </div>
              <div className="order-status-frame399">
                <div className="order-status-frame3861">
                  <span className="order-status-text134 12Regular">
                    <span>Item total (MRP)</span>
                  </span>
                  <span className="order-status-text136 12Regular">
                    <span>Rs. 329</span>
                  </span>
                </div>
                <div className="order-status-frame3871">
                  <div className="order-status-frame403">
                    <span className="order-status-text138 12Regular">
                      <span>Total Discount :</span>
                    </span>
                    <div className="order-status-frame404">
                      <span className="order-status-text140 12Regular">
                        <span>Coupon</span>
                      </span>
                      <span className="order-status-text142 12Regular">
                        <span>Wallet money :</span>
                      </span>
                    </div>
                  </div>
                  <div className="order-status-frame405">
                    <span className="order-status-text144 12Regular">
                      <span>-Rs 200</span>
                    </span>
                    <div className="order-status-frame406">
                      <span className="order-status-text146 12Regular">
                        <span>-Rs 34.49</span>
                      </span>
                      <span className="order-status-text148 12Regular">
                        <span>-Rs {Number(walletBalance)||0}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-status-frame388">
                  <span className="order-status-text150 12Regular">
                    <span>Shipping Free</span>
                  </span>
                  <span className="order-status-text152 12Regular">
                    <span>Free</span>
                  </span>
                </div>
              </div>
              <div className="order-status-frame389">
                <span className="order-status-text154 16Medium">
                  <span>Total Amount: (PAID)</span>
                </span>
                <span className="order-status-text156 16Medium">
                  <span>Rs. 129</span>
                </span>
              </div>
            </div>
            <div className="order-status-applycoupon-couponapplied1">
              <div className="order-status-frame400">
                <div className="order-status-frame4011">
                  <div className="order-status-real-estatehomehousebig">
                    <div className="order-status-group10">
                      <img
                        alt="PathI519"
                        src="/external/pathi519-pcf.svg"
                        className="order-status-path13"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-a1s9.svg"
                        className="order-status-path14"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-lcc8.svg"
                        className="order-status-path15"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-81b.svg"
                        className="order-status-path16"
                      />
                      <img
                        alt="PathI519"
                        src="/external/pathi519-tj7.svg"
                        className="order-status-path17"
                      />
                    </div>
                  </div>
                  <span className="order-status-text158 16Medium">
                    <span>Delivering to :</span>
                  </span>
                </div>
              </div>
              <div className="order-status-frame169">
                <div className="order-status-frame170">
                  <span className="order-status-text160 12Medium">
                    <span>My House</span>
                  </span>
                  <span className="order-status-text162 12Medium">|</span>
                  <span className="order-status-text163 12Medium">
                    <span>Lajo Lakshman (9606041618)</span>
                  </span>
                </div>
                <span className="order-status-text165 12Regular">
                  <span>
                    123, Sapphire Street, Koramangala 5th Block, 560095
                  </span>
                </span>
              </div>
            </div>
            <div className="order-status-frame2852">
              <div className="order-status-frame121">
                <span onClick={() => navigate("/trackorder")} className="order-status-text167 16Medium">
                  <span>Track your order</span>
                </span>
              </div>
              <div className="order-status-frame13">
                <span className="order-status-text169 16Medium">
                  <span>Contact Support</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus
