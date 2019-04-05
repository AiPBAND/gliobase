import React, {Component} from 'react';
import gbm from './../assets/GBM_therapy.jpg';
import './AboutGbm.css'
class AboutGbm extends Component {
	render() {
        return(
            <div className="content">
            <div className="title">Glioblastoma Multiforme</div>
              <p> 
                  Gliomas are the most common primary intracranial tumor which accounts for about 80 percent
                  of malignant brain tumors. Although relatively rare, they cause significant mortality and morbidity. 
              </p>
              <p>
                 Glioblastoma multiforme (GBM) is malignant Grade IV glioma that develops from glial cells present in
                 the brain. They are also commonly called glioblastoma. About 45% of all gliomas are GBM (15 % of all 
                 primary brain tumours) <a href="https://academic.oup.com/neuro-oncology/article/16/7/896/1927249">[1]</a> and is the most common histology with a 5-year relative survival of about 5%.
                 It is characterized by rapid growth and invasion into nearby regions of the brain prompted by cell migration
                 and degradation of the extracellular matrix.
              </p> 
              <p> 
                 GBMs may arise “de novo” meaning tumour with no evidence of a lower grade precursor and are termed as primary GBM. 
                 Alternatively, secondary GBMs can evolve over time from low-grade astrocytic tumours (Grade II or Grade III). 
                 GBMs are usually found in the cerebral hemisphere of the brain but is not limited to it. They can be found anywhere
                 in the brain.
              </p>
              <p>
                 Currently, GBMs are diagnosed as IDH-wildtype, IDH-mutant, or rarely as Glioblastoma NOS when the IDH status cannot
                  be ascertained. The diagnosis and its classification are as per the new 2016 World Health Organization (WHO) 
                  classification of brain tumours <a href="https://link.springer.com/article/10.1007/s00401-016-1545-1">[2]</a>. In the new WHO classification, in the diagnostic process and classification of 
                  gliomas, molecular information has been incorporated along with the histology. Usually diagnosed once it has already 
                  spread throughout the brain tissue, GBM usually cannot undergo total surgical resection. Although adjuvant therapies, 
                  such as radiotherapy and chemotherapy, are applicable and prolong survival, GBM usually has poor prognosis.
              </p>
              <div className="fig">
               <a href="https://www.frontiersin.org/articles/10.3389/fphys.2018.00170/full">
                  <img src={gbm} width="550" alt="GBM therapy" />
               </a> 
               </div>
                   <div className="fig">Fig.:The timeline of GBM therapy.
                   <a href="https://www.frontiersin.org/articles/10.3389/fphys.2018.00170/full">
                   [3]
                   </a>
                   </div>
                <div className="subtitle">References:</div>
                <p>
                    1. <a href="https://academic.oup.com/neuro-oncology/article/16/7/896/1927249">Ostrom QT, Bauchet L, Davis FG, et al. The epidemiology of glioma in adults: a "state of the science" 
                  review. Neuro Oncol. 2014;16(7):896-913.</a>
                 
                </p>
                <p>
                  2. <a href="https://link.springer.com/article/10.1007/s00401-016-1545-1">Louis D.N et al. (2016), The 2016 World Health Organization Classification of Tumors of the Central Nervous
                  System: a summary, Acta Neuropathol. </a>
                </p>
                <p>
                    3. <a href="https://www.frontiersin.org/articles/10.3389/fphys.2018.00170/full">Ozdemir-Kaynak E, Qutub AA, Yesil-Celiktas O. Advances in Glioblastoma Multiforme 
                   Treatment: New Models for Nanoparticle Therapy. Front Physiol. 2018;9:170. Published 2018 Mar 19. 
                   doi:10.3389/fphys.2018.00170.</a>
                </p>
               
            </div>
             
             
            
        )
    }
}
export default AboutGbm