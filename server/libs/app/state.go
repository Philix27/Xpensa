package app

import (
	"gorm.io/gorm"
)

type AppState struct {
	DB *gorm.DB
}
