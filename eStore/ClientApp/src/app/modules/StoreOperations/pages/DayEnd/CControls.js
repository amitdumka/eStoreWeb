//import Swal from 'sweetalert2/dist/sweetalert2.js'
//import 'sweetalert2/src/sweetalert2.scss'
import Swal from "sweetalert2";
import React from "react";
export function SweetAlert(params) {
  //Help https://sweetalert2.github.io/#examples
  return Swal.fire(params);
}

export function SweetMsg(params) {
    //Help https://sweetalert2.github.io/#examples
    return Swal.fire(params.title, params.text, params.icon?params.icon:"info");
  }

// {
//     title: { title },
//     text: { text },
//     icon: { icon },
//     confirmButtonText: { buttonText },
// }
{  /* <a href="#" class="btn btn-icon btn-light-primary pulse pulse-primary mr-5">
    <i class="flaticon2-bell-5"></i>
    <span class="pulse-ring"></span>
</a>

<a href="#" class="btn btn-icon btn-light-success pulse pulse-success mr-5">
    <i class="flaticon2-protected"></i>
    <span class="pulse-ring"></span>
</a> 
<span class="label pulse mr-10">
    <span class="position-relative">1</span>
    <span class="pulse-ring"></span>
</span>
<span class="label pulse mr-10">
    <span class="position-relative">2</span>
    <span class="pulse


*/
}

{
  /* <div class="card card-custom gutter-b">
    <div class="card-header card-header-tabs-line">
        <div class="card-title">
            <h3 class="card-label">Card Line Tabs</h3>
        </div>
        <div class="card-toolbar">
            <ul class="nav nav-tabs nav-bold nav-tabs-line">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#kt_tab_pane_1_2">Week</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#kt_tab_pane_2_2">Month</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        Year
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" data-toggle="tab" href="#kt_tab_pane_3_2">Action</a>
                        <a class="dropdown-item" data-toggle="tab" href="#kt_tab_pane_3_2">Another action</a>
                        <a class="dropdown-item" data-toggle="tab" href="#kt_tab_pane_3_2">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" data-toggle="tab" href="#kt_tab_pane_3_2">Separated link</a>
                    </div>
                 </li>
            </ul>
        </div>
    </div>
    <div class="card-body">
        <div class="tab-content">
            <div class="tab-pane fade show active" id="kt_tab_pane_1_2" role="tabpanel" aria-labelledby="kt_tab_pane_2">
                ...
            </div>
            <div class="tab-pane fade" id="kt_tab_pane_2_2" role="tabpanel" aria-labelledby="kt_tab_pane_2">
                ...
            </div>
            <div class="tab-pane fade" id="kt_tab_pane_3_2" role="tabpanel" aria-labelledby="kt_tab_pane_3">
                ...
            </div>
        </div>
    </div>
</div> */
}

// <div class="timeline timeline-1">
//     <div class="timeline-sep bg-primary-opacity-20"></div>
//     <div class="timeline-item">
//         <div class="timeline-label">6:00 am</div>
//         <div class="timeline-badge">
//             <i class="flaticon2-image-file text-primary "></i>
//         </div>
//         <div class="timeline-content text-muted font-weight-normal">
//             Amazon's 'Alexa Answers' is a
//             <a href="#" class="text-primary font-weight-bold">hot mess</a>, surprising exactly no one.
//         </div>
//     </div>
//     <div class="timeline-item">
//         <div class="timeline-label">7:45 am</div>
//         <div class="timeline-badge">
//             <i class="flaticon2-layers text-success "></i>
//         </div>
//         <div class="timeline-content text-muted font-weight-normal">
//             Database server overloaded 80% and requires quick reboot.
//             <span class="label label-inline label-light-primary font-weight-bolder">new</span>
//         </div>
//     </div>
//     <div class="timeline-item">
//         <div class="timeline-label">1 hrs</div>
//         <div class="timeline-badge">
//             <i class="flaticon2-pin text-warning "></i>
//         </div>
//         <div class="timeline-content text-muted font-weight-normal">
//             System error occured and hard drive has been shutdown.
//             <span class="label label-inline label-light-success font-weight-bolder">pending</span>
//         </div>
//     </div>
//     <div class="timeline-item">
//         <div class="timeline-label">2 days</div>
//         <div class="timeline-badge">
//             <i class="flaticon2-sms text-danger "></i>
//         </div>
//         <div class="timeline-content text-muted font-weight-normal">
//             New order has been placed and pending for processing.
//         </div>
//     </div>
//     <div class="timeline-item">
//         <div class="timeline-label">3 week</div>
//         <div class="timeline-badge">
//             <i class="flaticon2-paper-plane text-primary "></i>
//         </div>
//         <div class="timeline-content text-muted font-weight-normal">
//             This suite of 50+ apps will replace all your business tools.
//             <span class="label label-inline label-light-danger font-weight-bolder">2 pending</span>
//         </div>
//     </div>
//     <div class="timeline-item">
//         <div class="timeline-label">2 mons</div>
//         <div class="timeline-badge">
//             <i class="flaticon2-fax text-success "></i>
//         </div>
//         <div class="timeline-content text-muted font-weight-normal">
//             This app will email you about low airfares so you fly cheap.
//         </div>
//     </div>
// </div>

// <div class="card card-custom wave wave-animate-slow mb-8 mb-lg-0">
//  <div class="card-body">
//   <div class="d-flex align-items-center p-5">
//    <div class="mr-6">
//     <span class="svg-icon svg-icon-warning svg-icon-4x">
//      <svg>
//       ...
//      </svg>
//     </span>
//    </div>
//    <div class="d-flex flex-column">
//     <a href="#" class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">
//     Get Started
//     </a>
//     <div class="text-dark-75">
//      ...
//     </div>
//    </div>
//   </div>
//  </div>
// </div>

// <div class="card card-custom wave wave-animate wave-danger mb-8 mb-lg-0">
//  <div class="card-body">
//   <div class="d-flex align-items-center p-5">
//    <div class="mr-6">
//     <span class="svg-icon svg-icon-danger svg-icon-4x">
//      <svg>
//       ...
//      </svg>
//     </span>
//    </div>
//    <div class="d-flex flex-column">
//     <a href="#" class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">
//     Tutorials
//     </a>
//     <div class="text-dark-75">
//      ...
//     </div>
//    </div>
//   </div>
//  </div>
// </div>

{
  /* <div class="card card-custom">
 <div class="card-header ribbon ribbon-right">
  <div class="ribbon-target bg-primary" style="top: 10px; right: -2px;">Ribbon</div>
  <h3 class="card-title">
   Default
  </h3>
 </div>
 <div class="card-body">
  ...
 </div>
</div> */
}

// <div class="card card-custom">
//  <div class="card-header ribbon ribbon-clip ribbon-right">
//   <div class="ribbon-target" style="top: 15px; height: 45px;">
//    <span class="ribbon-inner bg-success"></span><i class="fa fa-star"></i>
//   </div>
//   <h3 class="card-title">
//    Clip Style
//   </h3>
//  </div>
//  <div class="card-body">
//   ...
//  </div>
// </div>
