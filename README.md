# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# Chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|nul: false|
|email|string|nul: false|
|password|string|null: false|

### Association
-has_many :chat_group
_has_many :posts

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||

### Association
-belongs_to :user
-belongs_to :chat-group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|froup_id|integer|null: false, freign_key: true|

### Association
-belongs_to :group
_belongs_to :user





