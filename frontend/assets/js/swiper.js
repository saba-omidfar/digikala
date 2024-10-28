const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})


// SWIPER1
const swiper1 = new Swiper('.swiper1', {
  // Optional parameters
  autoplay: {
    delay: 2200,
    disableOnInteraction: false,
  },
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})


// SWIPER2
const swiper2 = new Swiper(".swiper2", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 7,
      spaceBetween: 1
    },
    // when window width is >= 480px
    780: {
      slidesPerView: 5,
      spaceBetween: 2
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 2
    },
    // when window width is >= 640px
    0: {
      slidesPerView: 2,
      spaceBetween: 2
    }
  }
})


// SWIPER3
const swiper3 = new Swiper(".swiper3", {

  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 7,
    },
    // when window width is >= 480px
    780: {
      slidesPerView: 5,
    },
    480: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    0: {
      slidesPerView: 1,
    }
  }
})


// SWIPER4
const swiper4 = new Swiper(".swiper4", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 7,
      spaceBetween: 1
    },
    // when window width is >= 480px
    780: {
      slidesPerView: 5,
      spaceBetween: 2
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 2
    },
    // when window width is >= 640px
    0: {
      slidesPerView: 2,
      spaceBetween: 2
    }
  }
})


// SWIPER5
const swiper5 = new Swiper(".swiper5", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 4,
      spaceBetween: 1
    },
    // when window width is >= 480px
    780: {
      slidesPerView: 3,
      spaceBetween: 1
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 2
    },
    // when window width is >= 640px
    0: {
      slidesPerView: 1,
      spaceBetween: 2
    }
  }
})


// SWIPER6
const swiper6 = new Swiper(".swiper6", {
  
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 8,
  slidesPerView: 7,
  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 7
    },
    // when window width is >= 480px
    780: {
      slidesPerView: 6
    },
    480: {
      slidesPerView: 2
    },
    // when window width is >= 640px
    0: {
      slidesPerView: 1
    }
  }
})


// SWIPER7
const swiper7 = new Swiper('.swiper7', {

  // Optional parameters
  loop: true,

  breakpoints: {
    // when window width is >= 320px
    992: {
      slidesPerView: 9
    },
    // when window width is >= 480px
    780: {
      slidesPerView: 3
    },
    480: {
      slidesPerView: 2
    },
    // when window width is >= 640px
    0: {
      slidesPerView: 1
    }
  }
})


// SWIPER8
const swiper8 = new Swiper(".swiper8", {

  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    dynamicMainBulletsL: 6
  }
})


// SWIPER9
const swiper9 = new Swiper(".swiper9", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
})


// SWIPER10
const swiper10 = new Swiper(".swiper10", {

  slidesPerView: 4,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {

    0: {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerGroup: 1,
      slidesPerView: 2,
    },

    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    }
  }
})


// SWIPER11
const swiper11 = new Swiper(".swiper11", {

  spaceBetween: 9,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // breakpoints: {

  //   0: {
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     slidesPerGroup: 1,
  //     slidesPerView: 2,
  //   },

  //   992: {
  //     slidesPerView: 3,
  //     slidesPerGroup: 3,
  //   }
  // }
})


// SWIPER12
const swiper12 = new Swiper(".swiper12", {

  spaceBetween: 9,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // breakpoints: {

  //   0: {
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     slidesPerGroup: 1,
  //     slidesPerView: 2,
  //   },

  //   992: {
  //     slidesPerView: 3,
  //     slidesPerGroup: 3,
  //   }
  // }
})


// SWIPER13
const swiper13 = new Swiper(".swiper13", {

  spaceBetween: 9,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // breakpoints: {

  //   0: {
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     slidesPerGroup: 1,
  //     slidesPerView: 2,
  //   },

  //   992: {
  //     slidesPerView: 3,
  //     slidesPerGroup: 3,
  //   }
  // }
})