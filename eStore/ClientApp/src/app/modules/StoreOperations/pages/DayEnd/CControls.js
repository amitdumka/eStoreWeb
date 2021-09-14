/* eslint-disable react/style-prop-object */
//import Swal from 'sweetalert2/dist/sweetalert2.js'
//import 'sweetalert2/src/sweetalert2.scss'
import Swal from "sweetalert2";
import React from "react";

export function SweetAlert(params) {
  //Help https://sweetalert2.github.io/#examples
  // {title:"Success",text:"Message",icon:"success",confirmButtonText:"Ok"};
  return Swal.fire(params);
}

export function SweetMsg(params) {
  //Help https://sweetalert2.github.io/#examples
  return Swal.fire(
    params.title,
    params.text,
    params.icon ? params.icon : "info"
  );
}

export function PluseButton(params) {
  return (
    <a
      href={params.url}
      class="btn btn-icon btn-light-primary pulse pulse-primary mr-5"
    >
      <i class="flaticon2-bell-5"></i>
      {params.title}
      <span class="pulse-ring"></span>
    </a>
  );
}

export function PluseLabel(params) {
  return (
    <span class="label pulse mr-10">
      <span class="position-relative">{params.label}</span>
      <span class="pulse-ring"></span>
    </span>
  );
}

export function CCard(params) {
  return (
    <div class="card card-custom gutter-b">
      <div class="card-header card-header-tabs-line">
        <div class="card-title">
          <h3 class="card-label">{params.headerText}</h3>
          <div class="card-toolbar">
            <ul class="nav nav-tabs nav-bold nav-tabs-line">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#kt_tab_pane_1_2"
                >
                  {params.button1.text}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#kt_tab_pane_2_2">
                  {params.button2.text}
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href={params.button3.url}
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {params.button3.text}
                </a>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    data-toggle="tab"
                    href="#kt_tab_pane_3_2"
                  >
                    {params.button4.text}
                  </a>
                  <a
                    class="dropdown-item"
                    data-toggle="tab"
                    href="#kt_tab_pane_3_2"
                  >
                    {params.button4.text}
                  </a>
                  <a
                    class="dropdown-item"
                    data-toggle="tab"
                    href="#kt_tab_pane_3_2"
                  >
                    {params.button5.text}
                  </a>
                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    data-toggle="tab"
                    href="#kt_tab_pane_3_2"
                  >
                    {params.button6.text}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="tab-content">
          <div
            class="tab-pane fade show active"
            id="kt_tab_pane_1_2"
            role="tabpanel"
            aria-labelledby="kt_tab_pane_2"
          >
            {params.tab1}
          </div>
          <div
            class="tab-pane fade"
            id="kt_tab_pane_2_2"
            role="tabpanel"
            aria-labelledby="kt_tab_pane_2"
          >
            {params.tab1}
          </div>
          <div
            class="tab-pane fade"
            id="kt_tab_pane_3_2"
            role="tabpanel"
            aria-labelledby="kt_tab_pane_3"
          >
            {params.tab1}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TimeLine(params) {
  const { timeLineItem } = params;
  return (
    <div class="timeline timeline-1">
      <div class="timeline-sep bg-primary-opacity-20"></div>
      {timeLineItem.map((item) => (
        <div class="timeline-item">
          <div class="timeline-label">{item.time}</div>
          <div class="timeline-badge">
            <i class="flaticon2-image-file text-primary "></i>
          </div>
          <div class="timeline-content text-muted font-weight-normal">
            {item.text}
            <a href={item.button.url} class="text-primary font-weight-bold">
              {item.button.text}
            </a>
            {item.text2 && ","} {item.text2}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardWarning(params) {
  return (
    <div class="card card-custom wave wave-animate-slow mb-8 mb-lg-0">
      <div class="card-body">
        <div class="d-flex align-items-center p-5">
          <div class="mr-6">
            <span class="svg-icon svg-icon-warning svg-icon-4x">
              <svg>...</svg>
            </span>
          </div>
          <div class="d-flex flex-column">
            <a
              href={params.button1.url}
              class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3"
            >
              {params.button1.text}
            </a>
            <div class="text-dark-75">{params.cardBody}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardDanger(params) {
  return (
    <div class="card card-custom wave wave-animate wave-danger mb-8 mb-lg-0">
      <div class="card-body">
        <div class="d-flex align-items-center p-5">
          <div class="mr-6">
            <span class="svg-icon svg-icon-danger svg-icon-4x">
              <svg>...</svg>
            </span>
          </div>
          <div class="d-flex flex-column">
            <a
              href={params.button1.url}
              class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3"
            >
              {params.button1.text}
            </a>
            <div class="text-dark-75">{params.cardBody}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function RibbonCard(params) {
  return (
    <div class="card card-custom">
      <div class="card-header ribbon ribbon-right">
        <div class="ribbon-target bg-primary" style={"top: 10px; right: -2px;"}>
          {params.ribbonText}
        </div>
        <h3 class="card-title">{params.headerText}</h3>
      </div>
      <div class="card-body">{params.cardBody}</div>
    </div>
  );
}

export function RibbonIconCard(params) {
  return (
    <div class="card card-custom">
      <div class="card-header ribbon ribbon-clip ribbon-right">
        <div class="ribbon-target" style={"top: 15px; height: 45px;"}>
          <span class="ribbon-inner bg-success"></span>
          <i class="fa fa-star"></i>
        </div>
        <h3 class="card-title">{params.headerText}</h3>
      </div>
      <div class="card-body">{params.cardBody}</div>
    </div>
  );
}
